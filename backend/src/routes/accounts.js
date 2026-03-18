const express = require("express");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/accounts/profile — Get current user profile
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Parse name into parts if separate fields don't exist
    const nameParts = (user.name || "").split(" ");

    res.json({
      firstName: user.firstName || nameParts[0] || "",
      middleName: user.middleName || (nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : ""),
      lastName: user.lastName || (nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""),
      phone: user.phone || "",
      dob: user.dob || "",
      address: user.address || "",
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/accounts/profile — Update current user profile
router.put("/profile", requireAuth, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { firstName, middleName, lastName, phone, dob, address } = req.body;

    // Build display name from parts
    const nameParts = [firstName, middleName, lastName].filter(Boolean);
    const name = nameParts.length > 0 ? nameParts.join(" ") : undefined;

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (middleName !== undefined) updateData.middleName = middleName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (dob !== undefined) updateData.dob = dob;
    if (address !== undefined) updateData.address = address;
    if (name) updateData.name = name;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    const { password, resetCode, resetCodeExpiry, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error("Profile PUT error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
