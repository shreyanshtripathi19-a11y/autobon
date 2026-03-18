const express = require("express");

const router = express.Router();

// POST /api/forms — Submit a form (pre-qualify, finance, get-details, checkout)
router.post("/", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const {
      formType, firstName, lastName, email, phone, dob, address, postalCode,
      vehicleType, preferredVehicle, budget, hasTradeIn,
      creditRating, employmentStatus, incomeType, annualIncome, monthlyPayment,
      companyName, jobTitle, homeStatus,
      carId, carTitle, carPrice,
      extraData,
    } = req.body;

    if (!formType || !firstName || !email) {
      return res.status(400).json({ message: "Form type, first name, and email are required" });
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        firstName,
        lastName: lastName || "",
        email,
        phone: phone || null,
        dob: dob || null,
        address: address || null,
        postalCode: postalCode || null,
        vehicleType: vehicleType || null,
        preferredVehicle: preferredVehicle || null,
        budget: budget || null,
        hasTradeIn: hasTradeIn || null,
        creditRating: creditRating || null,
        employmentStatus: employmentStatus || null,
        incomeType: incomeType || null,
        annualIncome: annualIncome || null,
        monthlyPayment: monthlyPayment || null,
        companyName: companyName || null,
        jobTitle: jobTitle || null,
        homeStatus: homeStatus || null,
        carId: carId || null,
        carTitle: carTitle || null,
        carPrice: carPrice ? parseFloat(carPrice) : null,
        extraData: extraData ? JSON.stringify(extraData) : null,
        status: "new",
      },
    });

    const typeLabels = {
      "pre-qualify": "Pre-Qualification",
      "finance": "Finance Application",
      "get-details": "Get Details Request",
      "checkout": "Checkout Request",
    };

    console.log(`\n📋 New ${typeLabels[formType] || formType} from ${firstName} ${lastName} (${email})`);

    res.status(201).json({
      message: "Your application has been submitted successfully!",
      id: submission.id,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
