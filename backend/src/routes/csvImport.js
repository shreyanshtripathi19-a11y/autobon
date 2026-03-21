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

// ─── Normalize a header string: lowercase, strip all spaces/underscores/dashes ───
const normalizeKey = (key) =>
  String(key).toLowerCase().replace(/[\s_\-\.]+/g, "");

// ─── Map of all recognized normalized keys → the Prisma field name ───
// This allows columns named "Fuel Type", "fuel_type", "FuelType", "FUEL-TYPE", etc.
// to all map correctly to the `fuelType` Prisma field.
const FIELD_ALIASES = {
  // Required
  year: "year",
  make: "make",
  model: "model",
  price: "price",

  // Standard
  title: "title",
  trim: "trim",
  mileage: "mileage",
  km: "mileage",
  kilometers: "mileage",
  odometer: "mileage",

  fueltype: "fuelType",
  fuel: "fuelType",

  transmission: "transmission",
  trans: "transmission",

  bodytype: "bodyType",
  body: "bodyType",
  bodystyle: "bodyType",
  type: "bodyType",

  color: "color",
  colour: "color",
  exteriorcolor: "color",
  exteriorcolour: "color",

  condition: "condition",

  location: "location",
  city: "location",

  description: "description",
  desc: "description",

  badge: "badge",

  pricerating: "priceRating",
  pricerate: "priceRating",

  biweekly: "biWeekly",
  biweeklypayment: "biWeekly",

  downpayment: "downPayment",
  down: "downPayment",

  noaccident: "noAccident",
  noaccidents: "noAccident",
  accident: "noAccident",
  accidentfree: "noAccident",
  cleancarfax: "noAccident",

  isvisible: "isVisible",
  visible: "isVisible",

  features: "features",
  options: "features",

  images: "images",
  imageurls: "images",
  imageurl: "images",
  photos: "images",
};

// ─── Build a lookup from a row's actual CSV column names → Prisma field ───
const buildColumnMap = (csvHeaders) => {
  const columnMap = {}; // { actualCsvHeader: prismaFieldName }
  for (const header of csvHeaders) {
    const normalized = normalizeKey(header);
    if (FIELD_ALIASES[normalized]) {
      columnMap[header] = FIELD_ALIASES[normalized];
    }
  }
  return columnMap;
};

// ─── Get value for a given Prisma field from a CSV row using the column map ───
const getField = (row, columnMap, fieldName) => {
  for (const [csvHeader, prismaField] of Object.entries(columnMap)) {
    if (prismaField === fieldName && row[csvHeader] !== undefined) {
      return row[csvHeader];
    }
  }
  return undefined;
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

    // Get the actual CSV column headers from the first record's keys
    const csvHeaders = Object.keys(records[0]);
    const columnMap = buildColumnMap(csvHeaders);

    // Report which columns were recognized
    const recognized = Object.entries(columnMap).map(
      ([csv, field]) => `"${csv}" → ${field}`
    );
    const unrecognized = csvHeaders.filter((h) => !columnMap[h]);

    const prisma = req.app.locals.prisma;
    const imported = [];
    const errors = [];

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      const rowNum = i + 2; // +2 because row 1 is the header in the CSV

      // --- Read fields via flexible column map ---
      const rawYear = getField(row, columnMap, "year");
      const rawMake = getField(row, columnMap, "make");
      const rawModel = getField(row, columnMap, "model");
      const rawPrice = getField(row, columnMap, "price");

      const year = parseInt(rawYear);
      const make = (rawMake || "").trim();
      const model = (rawModel || "").trim();
      const price = parseFloat(String(rawPrice || "").replace(/[,$]/g, ""));

      // --- Validate required fields ---
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

      // --- Read all optional fields ---
      const rawTitle = getField(row, columnMap, "title");
      const rawTrim = getField(row, columnMap, "trim");
      const rawMileage = getField(row, columnMap, "mileage");
      const rawFuelType = getField(row, columnMap, "fuelType");
      const rawTransmission = getField(row, columnMap, "transmission");
      const rawBodyType = getField(row, columnMap, "bodyType");
      const rawColor = getField(row, columnMap, "color");
      const rawCondition = getField(row, columnMap, "condition");
      const rawLocation = getField(row, columnMap, "location");
      const rawDescription = getField(row, columnMap, "description");
      const rawBadge = getField(row, columnMap, "badge");
      const rawPriceRating = getField(row, columnMap, "priceRating");
      const rawBiWeekly = getField(row, columnMap, "biWeekly");
      const rawDownPayment = getField(row, columnMap, "downPayment");
      const rawNoAccident = getField(row, columnMap, "noAccident");
      const rawIsVisible = getField(row, columnMap, "isVisible");
      const rawFeatures = getField(row, columnMap, "features");

      // --- Build car data ---
      const title =
        (rawTitle || "").trim() || `${year} ${make} ${model}`.trim();

      const carData = {
        title,
        year,
        make,
        model,
        trim: (rawTrim || "").trim() || null,
        price,
        mileage: (rawMileage || "").trim() || null,
        fuelType: (rawFuelType || "").trim() || "Gasoline",
        transmission: (rawTransmission || "").trim() || "Automatic",
        bodyType: (rawBodyType || "").trim() || "Sedan",
        color: (rawColor || "").trim() || null,
        condition: (rawCondition || "").trim() || "Used",
        location: (rawLocation || "").trim() || null,
        description: (rawDescription || "").trim() || null,
        badge: (rawBadge || "").trim() || null,
        priceRating: (rawPriceRating || "").trim() || null,
        biWeekly: (rawBiWeekly || "").trim() || null,
        downPayment: (rawDownPayment || "").trim() || null,
        noAccident:
          toBool(rawNoAccident) !== undefined ? toBool(rawNoAccident) : true,
        isVisible:
          toBool(rawIsVisible) !== undefined
            ? toBool(rawIsVisible)
            : true, // Default to visible
        features: parseFeatures(rawFeatures),
      };

      try {
        const car = await prisma.car.create({ data: carData });

        // If images column exists, create CarImage records
        const rawImages = getField(row, columnMap, "images");
        const imageUrls = (rawImages || "").trim();
        if (imageUrls) {
          const urls = imageUrls
            .split("|")
            .map((u) => u.trim())
            .filter(Boolean);
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
      recognizedColumns: recognized,
      unrecognizedColumns: unrecognized,
      errors,
    });
  } catch (err) {
    console.error("CSV import error:", err);
    res.status(500).json({ message: "CSV import failed: " + err.message });
  }
});

module.exports = router;
