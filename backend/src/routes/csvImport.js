const express = require("express");
const multer = require("multer");
const { parse } = require("csv-parse/sync");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Store CSV in memory (max 5MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/csv" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.originalname.endsWith(".csv")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"), false);
    }
  },
});

// Helpers
const toBool = (val) => {
  if (val === undefined || val === null || val === "") return undefined;
  const lower = String(val).toLowerCase().trim();
  return ["true", "yes", "1", "y"].includes(lower);
};

const parseFeatures = (val) => {
  if (!val || !val.trim()) return [];
  return val
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean);
};

// POST /api/admin/csv-import
router.post("/", requireAdmin, upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No CSV file uploaded" });
    }

    const csvContent = req.file.buffer.toString("utf-8");

    let records;
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        bom: true,
      });
    } catch (parseErr) {
      return res.status(400).json({
        message: `CSV parsing error: ${parseErr.message}`,
      });
    }

    if (!records || records.length === 0) {
      return res
        .status(400)
        .json({ message: "CSV file is empty or has no data rows" });
    }

    const prisma = req.app.locals.prisma;
    const imported = [];
    const errors = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      const rowNum = i + 2; // +2 because row 1 is the header in the CSV

      // --- Validate required fields ---
      const year = parseInt(row.year);
      const make = (row.make || "").trim();
      const model = (row.model || "").trim();
      const price = parseFloat(row.price);

      const missingFields = [];
      if (!year || isNaN(year)) missingFields.push("year");
      if (!make) missingFields.push("make");
      if (!model) missingFields.push("model");
      if (isNaN(price) || price <= 0) missingFields.push("price");

      if (missingFields.length > 0) {
        errors.push({
          row: rowNum,
          reason: `Missing required field(s): ${missingFields.join(", ")}`,
        });
        continue;
      }

      // --- Build car data ---
      const title =
        (row.title || "").trim() || `${year} ${make} ${model}`.trim();

      const carData = {
        title,
        year,
        make,
        model,
        trim: (row.trim || "").trim() || null,
        price,
        mileage: (row.mileage || "").trim() || null,
        fuelType: (row.fuelType || row.fuel_type || "").trim() || "Gasoline",
        transmission: (row.transmission || "").trim() || "Automatic",
        bodyType:
          (row.bodyType || row.body_type || "").trim() || "Sedan",
        color: (row.color || "").trim() || null,
        condition: (row.condition || "").trim() || "Used",
        location: (row.location || "").trim() || null,
        description: (row.description || "").trim() || null,
        badge: (row.badge || "").trim() || null,
        priceRating:
          (row.priceRating || row.price_rating || "").trim() || null,
        biWeekly: (row.biWeekly || row.bi_weekly || "").trim() || null,
        downPayment:
          (row.downPayment || row.down_payment || "").trim() || null,
        noAccident:
          toBool(row.noAccident ?? row.no_accident) !== undefined
            ? toBool(row.noAccident ?? row.no_accident)
            : true,
        isVisible:
          toBool(row.isVisible ?? row.is_visible) !== undefined
            ? toBool(row.isVisible ?? row.is_visible)
            : false, // Default to hidden so admin can add images first
        features: parseFeatures(row.features),
      };

      try {
        const car = await prisma.car.create({ data: carData });

        // If images column exists, create CarImage records
        const imageUrls = (row.images || row.image_urls || "").trim();
        if (imageUrls) {
          const urls = imageUrls.split("|").map(u => u.trim()).filter(Boolean);
          if (urls.length > 0) {
            await prisma.carImage.createMany({
              data: urls.map((url, position) => ({
                url,
                position,
                carId: car.id,
              })),
            });
          }
        }

        imported.push({ row: rowNum, id: car.id, title: car.title });
      } catch (dbErr) {
        errors.push({
          row: rowNum,
          reason: `Database error: ${dbErr.message}`,
        });
      }
    }

    res.json({
      message: `Import complete: ${imported.length} imported, ${errors.length} skipped`,
      imported: imported.length,
      skipped: errors.length,
      total: records.length,
      errors,
    });
  } catch (err) {
    console.error("CSV import error:", err);
    res.status(500).json({ message: "CSV import failed: " + err.message });
  }
});

module.exports = router;
