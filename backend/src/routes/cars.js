const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/cars — Public: list all visible cars
router.get("/", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { make, model, bodyType, condition, color, minPrice, maxPrice, minYear, maxYear, search, sort } = req.query;

    const where = { isVisible: true };

    if (make && make !== "All Makes") where.make = make;
    if (model && model !== "All Models") where.model = { contains: model, mode: "insensitive" };
    if (bodyType && bodyType !== "All Body Types") where.bodyType = bodyType;
    if (condition && condition !== "All Conditions") where.condition = condition;
    if (color && color !== "All Colors") where.color = color;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year.gte = parseInt(minYear);
      if (maxYear) where.year.lte = parseInt(maxYear);
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { make: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build sort order
    let orderBy = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };
    else if (sort === "year_desc") orderBy = { year: "desc" };
    else if (sort === "year_asc") orderBy = { year: "asc" };
    else if (sort === "make_asc") orderBy = { make: "asc" };
    else if (sort === "make_desc") orderBy = { make: "desc" };
    else if (sort === "newest") orderBy = { createdAt: "desc" };
    else if (sort === "oldest") orderBy = { createdAt: "asc" };

    const cars = await prisma.car.findMany({
      where,
      orderBy,
      include: { images: { orderBy: { position: "asc" } } },
    });

    res.json(cars);
  } catch (error) {
    console.error("List cars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/cars/all — Admin: list ALL cars (including hidden)
router.get("/all", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const cars = await prisma.car.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { position: "asc" } } },
    });
    res.json(cars);
  } catch (error) {
    console.error("List all cars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/cars/:id — Public: get car details
router.get("/:id", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const car = await prisma.car.findUnique({
      where: { id: req.params.id },
      include: { images: { orderBy: { position: "asc" } } },
    });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error("Get car error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/cars — Admin: create a car
router.post("/", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const {
      title, year, make, model, trim, price, mileage, fuelType,
      transmission, bodyType, color, condition, location, description,
      badge, priceRating, isVisible, noAccident, biWeekly, downPayment,
      features, imageUrls,
    } = req.body;

    if (!title || !year || !make || !model || price === undefined) {
      return res.status(400).json({ message: "Title, year, make, model, and price are required" });
    }

    const carData = {
      title,
      year: parseInt(year),
      make,
      model,
      trim: trim || null,
      price: parseFloat(price),
      mileage: mileage || null,
      fuelType: fuelType || null,
      transmission: transmission || null,
      bodyType: bodyType || null,
      color: color || null,
      condition: condition || "Used",
      location: location || null,
      description: description || null,
      badge: badge || null,
      priceRating: priceRating || null,
      isVisible: isVisible !== false,
      noAccident: noAccident !== false,
      biWeekly: biWeekly || null,
      downPayment: downPayment || null,
      features: features || [],
    };

    // If imageUrls are provided, create images too
    if (imageUrls && imageUrls.length > 0) {
      carData.images = {
        create: imageUrls.map((url, index) => ({ url, position: index })),
      };
    }

    const car = await prisma.car.create({
      data: carData,
      include: { images: true },
    });

    res.status(201).json(car);
  } catch (error) {
    console.error("Create car error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/cars/:id — Admin: update a car
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const {
      title, year, make, model, trim, price, mileage, fuelType,
      transmission, bodyType, color, condition, location, description,
      badge, priceRating, isVisible, noAccident, biWeekly, downPayment,
      features, imageUrls,
    } = req.body;

    // Check car exists
    const existing = await prisma.car.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ message: "Car not found" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (year !== undefined) updateData.year = parseInt(year);
    if (make !== undefined) updateData.make = make;
    if (model !== undefined) updateData.model = model;
    if (trim !== undefined) updateData.trim = trim;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (mileage !== undefined) updateData.mileage = mileage;
    if (fuelType !== undefined) updateData.fuelType = fuelType;
    if (transmission !== undefined) updateData.transmission = transmission;
    if (bodyType !== undefined) updateData.bodyType = bodyType;
    if (color !== undefined) updateData.color = color;
    if (condition !== undefined) updateData.condition = condition;
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    if (badge !== undefined) updateData.badge = badge;
    if (priceRating !== undefined) updateData.priceRating = priceRating;
    if (isVisible !== undefined) updateData.isVisible = isVisible;
    if (noAccident !== undefined) updateData.noAccident = noAccident;
    if (biWeekly !== undefined) updateData.biWeekly = biWeekly;
    if (downPayment !== undefined) updateData.downPayment = downPayment;
    if (features !== undefined) updateData.features = features;

    // If new images provided, replace all images
    if (imageUrls && imageUrls.length > 0) {
      await prisma.carImage.deleteMany({ where: { carId: req.params.id } });
      await prisma.carImage.createMany({
        data: imageUrls.map((url, index) => ({
          carId: req.params.id,
          url,
          position: index,
        })),
      });
    }

    const car = await prisma.car.update({
      where: { id: req.params.id },
      data: updateData,
      include: { images: { orderBy: { position: "asc" } } },
    });

    res.json(car);
  } catch (error) {
    console.error("Update car error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/cars/:id — Admin: delete a car
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;

    const existing = await prisma.car.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ message: "Car not found" });
    }

    await prisma.car.delete({ where: { id: req.params.id } });

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Delete car error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
