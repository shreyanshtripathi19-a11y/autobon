const express = require("express");

const router = express.Router();

// POST /api/contact — Submit contact/availability form
router.post("/", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { firstName, lastName, email, phone, comment, carTitle, hasTradeIn } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "First name, last name, and email are required" });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        comment: comment || null,
        carTitle: carTitle || null,
        hasTradeIn: hasTradeIn || false,
      },
    });

    console.log(`\n📬 New contact submission from ${firstName} ${lastName} (${email})`);
    if (carTitle) console.log(`   Re: ${carTitle}`);

    res.status(201).json({
      message: "Your message has been sent successfully. Our team will get back to you shortly.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
