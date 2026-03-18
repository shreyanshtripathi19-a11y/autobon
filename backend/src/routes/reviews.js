const express = require("express");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/reviews — Public: get all visible reviews (ordered by position)
router.get("/", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const reviews = await prisma.review.findMany({
      where: { isVisible: true },
      orderBy: { position: "asc" },
    });
    res.json(reviews);
  } catch (error) {
    console.error("Reviews GET error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/reviews/all — Admin: get ALL reviews (including hidden)
router.get("/all", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const reviews = await prisma.review.findMany({
      orderBy: { position: "asc" },
    });
    res.json(reviews);
  } catch (error) {
    console.error("Reviews all GET error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/reviews — Admin: create a review
router.post("/", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { name, role, text, rating, imageUrl, isVisible, position } = req.body;

    if (!name || !text) {
      return res.status(400).json({ message: "Name and review text are required" });
    }

    // Auto-set position to end if not provided
    let pos = position;
    if (pos === undefined || pos === null) {
      const count = await prisma.review.count();
      pos = count;
    }

    const review = await prisma.review.create({
      data: {
        name,
        role: role || "Satisfied Customer",
        text,
        rating: rating || 5,
        imageUrl: imageUrl || null,
        isVisible: isVisible !== false,
        position: pos,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Review create error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/reviews/:id — Admin: update a review
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { name, role, text, rating, imageUrl, isVisible, position } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (text !== undefined) updateData.text = text;
    if (rating !== undefined) updateData.rating = rating;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isVisible !== undefined) updateData.isVisible = isVisible;
    if (position !== undefined) updateData.position = position;

    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json(review);
  } catch (error) {
    console.error("Review update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/reviews/:id — Admin: delete a review
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.review.delete({ where: { id: req.params.id } });
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Review delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
