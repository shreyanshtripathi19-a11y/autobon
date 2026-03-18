const express = require("express");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/admin/stats — Dashboard statistics
router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;

    const [totalCars, visibleCars, totalUsers, avgPriceResult, totalContacts, totalForms, totalReviews, newForms] = await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isVisible: true } }),
      prisma.user.count(),
      prisma.car.aggregate({ _avg: { price: true } }),
      prisma.contactSubmission.count(),
      prisma.formSubmission.count(),
      prisma.review.count(),
      prisma.formSubmission.count({ where: { status: "new" } }),
    ]);

    // Cars added in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentCars = await prisma.car.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // New users in last 30 days
    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // Get recent listings for activity feed
    const recentListings = await prisma.car.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, price: true, createdAt: true, isVisible: true },
    });

    res.json({
      totalListings: totalCars,
      visibleListings: visibleCars,
      activeUsers: totalUsers,
      avgPrice: Math.round(avgPriceResult._avg.price || 0),
      recentListings: recentCars,
      recentUsers,
      totalContacts,
      totalForms,
      totalReviews,
      newForms,
      recentActivity: recentListings,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ─── Users ──────────────────────────────────────────────────────────────────────

// GET /api/admin/users — List all users
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, name: true, email: true, role: true,
        phone: true, firstName: true, lastName: true, createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/admin/users/:id/role — Change user role
router.put("/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { role } = req.body;
    if (!["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ message: "Role must be USER or ADMIN" });
    }
    if (req.params.id === req.user.id && role !== "ADMIN") {
      return res.status(400).json({ message: "You cannot change your own role" });
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
    res.json(user);
  } catch (error) {
    console.error("Admin role change error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/admin/users/:id — Delete a user
router.delete("/users/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ─── Contacts ───────────────────────────────────────────────────────────────────

// GET /api/admin/contacts — List all contact submissions
router.get("/contacts", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(contacts);
  } catch (error) {
    console.error("Admin contacts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/admin/contacts/:id — Delete a contact submission
router.delete("/contacts/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.contactSubmission.delete({ where: { id: req.params.id } });
    res.json({ message: "Contact submission deleted" });
  } catch (error) {
    console.error("Admin delete contact error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ─── Form Submissions ───────────────────────────────────────────────────────────

// GET /api/admin/forms — List all form submissions
router.get("/forms", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { type, status } = req.query;
    const where = {};
    if (type) where.formType = type;
    if (status) where.status = status;

    const forms = await prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json(forms);
  } catch (error) {
    console.error("Admin forms error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/admin/forms/:id/status — Update form submission status
router.put("/forms/:id/status", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { status, adminNotes } = req.body;
    if (!["new", "reviewed", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const form = await prisma.formSubmission.update({
      where: { id: req.params.id },
      data: { status, ...(adminNotes !== undefined && { adminNotes }) },
    });
    res.json(form);
  } catch (error) {
    console.error("Admin update form error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/admin/forms/:id — Delete a form submission
router.delete("/forms/:id", requireAdmin, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.formSubmission.delete({ where: { id: req.params.id } });
    res.json({ message: "Form submission deleted" });
  } catch (error) {
    console.error("Admin delete form error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

