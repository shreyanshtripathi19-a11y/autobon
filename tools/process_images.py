#!/usr/bin/env python3
"""
Autobon Image Processing Pipeline
==================================
Reads a CSV with car data + raw image URLs, processes each image:
  1. Downloads the original image
  2. Removes the background using rembg (with alpha matting to keep shadows)
  3. Composites the car onto the branded background (which already has the watermark)
  4. Uploads the final image to Firebase Storage
  5. Outputs a new CSV with Firebase URLs ready for admin panel import

Usage:
    python process_images.py --input cars.csv --output cars_final.csv

Prerequisites:
    pip install -r requirements.txt
    Place your files in the tools/ directory:
      - firebase-key.json   (Firebase Admin SDK service account key)
      - background.png      (Your branded background with watermark baked in)
"""

import csv
import os
import sys
import time
import uuid
import argparse
import io
from pathlib import Path

import requests
from PIL import Image
import firebase_admin
from firebase_admin import credentials, storage


# ─── CONFIGURATION ───────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
DEFAULT_BACKGROUND = SCRIPT_DIR / "background.png"
DEFAULT_FIREBASE_KEY = SCRIPT_DIR / "firebase-key.json"
FIREBASE_BUCKET = "autobon-c7edf.firebasestorage.app"

# PhotoRoom API keys (try sandbox first, then production)
PHOTOROOM_SANDBOX_KEY = "sandbox_sk_pr_default_9b0203ab58924fe76c8bc3a7064ab353f2454dd8"
PHOTOROOM_PRODUCTION_KEY = "sk_pr_default_9b0203ab58924fe76c8bc3a7064ab353f2454dd8"
PHOTOROOM_API_URL = "https://sdk.photoroom.com/v1/segment"

# Car placement — calibrated from reference image pixel analysis
CAR_WIDTH_RATIO = 0.68       # Car fills 68% of image width
CAR_BOTTOM_RATIO = 0.846     # Bottom of car tires at 84.6% from top
CAR_CENTER_X_RATIO = 0.503   # Horizontally centered at 50.3%

# Temp directory for downloaded images
TEMP_DIR = SCRIPT_DIR / "temp_images"


# ─── FIREBASE SETUP ─────────────────────────────────────────────────────────

def init_firebase(key_path):
    """Initialize Firebase Admin SDK."""
    if not os.path.exists(key_path):
        print(f"⚠️  Firebase key not found at: {key_path}")
        print("   Images will be saved locally instead of uploading to Firebase.")
        return None

    try:
        cred = credentials.Certificate(str(key_path))
        firebase_admin.initialize_app(cred, {"storageBucket": FIREBASE_BUCKET})
        bucket = storage.bucket()
        print(f"✅ Firebase connected to bucket: {FIREBASE_BUCKET}")
        return bucket
    except Exception as e:
        print(f"⚠️  Firebase initialization failed: {e}")
        return None


def upload_to_firebase(bucket, local_path, remote_filename):
    """Upload a file to Firebase Storage and return its public URL."""
    blob = bucket.blob(f"car-images/{remote_filename}")
    blob.upload_from_filename(str(local_path), content_type="image/png")
    blob.make_public()
    return blob.public_url


# ─── IMAGE PROCESSING ───────────────────────────────────────────────────────

def download_image(url, save_path):
    """Download an image from a URL."""
    try:
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()
        with open(save_path, "wb") as f:
            for chunk in response.iter_content(8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"   ❌ Download failed: {e}")
        return False


def remove_background_photoroom(input_path, api_key):
    """Remove background using PhotoRoom API — professional quality, preserves shadows."""
    with open(input_path, "rb") as f:
        files = {"image_file": (os.path.basename(input_path), f, "image/jpeg")}
        headers = {"x-api-key": api_key}
        response = requests.post(
            PHOTOROOM_API_URL,
            files=files,
            headers=headers,
            timeout=60,
        )

    if response.status_code == 200:
        return Image.open(io.BytesIO(response.content)).convert("RGBA")
    else:
        raise Exception(f"PhotoRoom API error {response.status_code}: {response.text[:200]}")


def remove_background(input_path):
    """Remove background — tries PhotoRoom API first, falls back to rembg."""
    # Try PhotoRoom sandbox key first
    for label, key in [("sandbox", PHOTOROOM_SANDBOX_KEY), ("production", PHOTOROOM_PRODUCTION_KEY)]:
        try:
            result = remove_background_photoroom(input_path, key)
            print(f"   ✅ PhotoRoom ({label}) succeeded")
            return result
        except Exception as e:
            print(f"   ⚠️  PhotoRoom ({label}) failed: {e}")
            continue

    # Fallback to local rembg
    print("   📦 Falling back to local rembg...")
    from rembg import remove
    with open(input_path, "rb") as f:
        input_data = f.read()
    output_data = remove(
        input_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=270,
        alpha_matting_background_threshold=20,
        alpha_matting_erode_size=10,
    )
    return Image.open(io.BytesIO(output_data)).convert("RGBA")


def composite_on_background(car_img, background_path):
    """Place the car onto the background using calibrated reference measurements."""
    bg = Image.open(background_path).convert("RGBA")
    bg_w, bg_h = bg.size

    # Trim fully transparent edges (but keep semi-transparent shadow areas)
    bbox = car_img.getbbox()
    if bbox:
        car_img = car_img.crop(bbox)

    # Scale car to match reference proportions (68% of image width)
    car_w, car_h = car_img.size
    target_w = int(bg_w * CAR_WIDTH_RATIO)
    scale = target_w / car_w
    target_h = int(car_h * scale)

    # Safety: don't let the car exceed 65% of image height
    if target_h > int(bg_h * 0.65):
        target_h = int(bg_h * 0.65)
        scale = target_h / car_h
        target_w = int(car_w * scale)

    car_resized = car_img.resize((target_w, target_h), Image.LANCZOS)

    # Position: center horizontally at 50.3%
    center_x = int(bg_w * CAR_CENTER_X_RATIO)
    x = center_x - (target_w // 2)

    # Position: bottom of car at 84.6% from top
    floor_y = int(bg_h * CAR_BOTTOM_RATIO)
    y = floor_y - target_h

    bg.paste(car_resized, (x, y), car_resized)
    return bg


# ─── MAIN PIPELINE ───────────────────────────────────────────────────────────

def process_csv(input_csv, output_csv, background_path, firebase_bucket):
    """Main pipeline: read CSV → process images → write new CSV."""
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    output_dir = SCRIPT_DIR / "processed_images"
    output_dir.mkdir(parents=True, exist_ok=True)

    with open(input_csv, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        rows = list(reader)

    # Ensure 'images' column exists in output
    if "images" not in fieldnames:
        fieldnames.append("images")

    total = len(rows)
    print(f"\n🚗 Processing {total} cars from {input_csv}\n")

    processed_rows = []
    for idx, row in enumerate(rows):
        car_label = f"{row.get('year', '?')} {row.get('make', '?')} {row.get('model', '?')}"
        print(f"[{idx + 1}/{total}] {car_label}")

        # Get image URLs (pipe-separated)
        raw_urls = (row.get("image_urls") or row.get("images") or "").strip()
        if not raw_urls:
            print("   ⏭️  No image URLs, skipping image processing")
            processed_rows.append(row)
            continue

        urls = [u.strip() for u in raw_urls.split("|") if u.strip()]
        firebase_urls = []

        for img_idx, url in enumerate(urls):
            img_label = f"  Image {img_idx + 1}/{len(urls)}"
            print(f"{img_label}: Downloading...")

            # 1. Download
            ext = url.rsplit(".", 1)[-1].split("?")[0][:4] if "." in url else "jpg"
            temp_file = TEMP_DIR / f"car_{idx}_{img_idx}.{ext}"
            if not download_image(url, temp_file):
                continue

            # 2. Remove background (with shadow preservation)
            print(f"{img_label}: Removing background (preserving shadows)...")
            try:
                car_transparent = remove_background(temp_file)
            except Exception as e:
                print(f"{img_label}: ❌ Background removal failed: {e}")
                continue

            # 3. Composite on background (watermark is already in the background)
            print(f"{img_label}: Compositing on background...")
            try:
                final = composite_on_background(car_transparent, background_path)
            except Exception as e:
                print(f"{img_label}: ❌ Compositing failed: {e}")
                continue

            # 4. Save locally
            unique_name = f"{row.get('year', 'car')}_{row.get('make', '')}_{row.get('model', '')}_{img_idx}_{uuid.uuid4().hex[:8]}.png"
            unique_name = unique_name.replace(" ", "_").lower()
            local_output = output_dir / unique_name
            final.convert("RGB").save(str(local_output), "PNG", optimize=True)

            # 5. Upload to Firebase (or save locally)
            if firebase_bucket:
                print(f"{img_label}: Uploading to Firebase...")
                try:
                    fb_url = upload_to_firebase(firebase_bucket, local_output, unique_name)
                    firebase_urls.append(fb_url)
                    print(f"{img_label}: ✅ Uploaded → {fb_url}")
                except Exception as e:
                    print(f"{img_label}: ❌ Upload failed: {e}")
                    firebase_urls.append(str(local_output))
            else:
                firebase_urls.append(str(local_output))
                print(f"{img_label}: ✅ Saved locally → {local_output}")

            # Clean up temp file
            try:
                temp_file.unlink()
            except:
                pass

        # Update the row with the new image URLs
        row["images"] = "|".join(firebase_urls)
        processed_rows.append(row)
        print()

    # Write output CSV
    with open(output_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(processed_rows)

    print(f"\n🎉 Done! Output CSV saved to: {output_csv}")
    print(f"   Processed {total} cars")
    if firebase_bucket:
        print(f"   Images uploaded to Firebase Storage")
    else:
        print(f"   Images saved locally in: {output_dir}/")
    print(f"\n📋 Next step: Upload '{output_csv}' in your Admin Panel → Import CSV")


# ─── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Autobon Image Processing Pipeline — Downloads, removes BG (preserving shadows), composites on branded background"
    )
    parser.add_argument("--input", "-i", required=True, help="Path to input CSV file")
    parser.add_argument("--output", "-o", default=None, help="Path for output CSV (default: input_processed.csv)")
    parser.add_argument("--background", "-bg", default=str(DEFAULT_BACKGROUND), help="Path to background image (with watermark baked in)")
    parser.add_argument("--firebase-key", "-fk", default=str(DEFAULT_FIREBASE_KEY), help="Path to Firebase service account key JSON")

    args = parser.parse_args()

    # Default output name
    if not args.output:
        input_name = Path(args.input).stem
        args.output = str(Path(args.input).parent / f"{input_name}_processed.csv")

    # Check input file
    if not os.path.exists(args.input):
        print(f"❌ Input CSV not found: {args.input}")
        sys.exit(1)

    # Check background
    if not os.path.exists(args.background):
        print(f"❌ Background image not found: {args.background}")
        print(f"   Please place your background image at: {DEFAULT_BACKGROUND}")
        sys.exit(1)

    # Init Firebase
    bucket = init_firebase(args.firebase_key)

    # Run pipeline
    start = time.time()
    process_csv(args.input, args.output, args.background, bucket)
    elapsed = time.time() - start
    print(f"\n⏱️  Total time: {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")


if __name__ == "__main__":
    main()
