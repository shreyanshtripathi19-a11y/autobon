const express = require("express");

const router = express.Router();

// POST /api/forms — Submit a form (pre-qualify, finance, get-details, sell-car, checkout)
router.post("/", async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const body = req.body;

    // Accept either "formType" or "type" field
    const formType = body.formType || body.type;

    // Some forms (pre-qualify, finance) send a nested "data" object with all fields
    // while others (sell-car) send fields at the top level.
    // Merge both so we always find the fields.
    const d = { ...body, ...(body.data || {}) };

    // Extract fields — try top-level first, fallback to nested "data"
    const firstName = d.firstName || (body.name || "").split(" ")[0] || "";
    const lastName = d.lastName || (body.name || "").split(" ").slice(1).join(" ") || "";
    const email = d.email || "";
    const phone = d.phone || d.phoneNumber || null;

    if (!formType || !firstName || !email) {
      return res.status(400).json({ message: "Form type, first name, and email are required" });
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        firstName,
        lastName,
        email,
        phone,
        dob: d.dob || null,
        address: d.address || d.streetAddress || null,
        postalCode: d.postalCode || null,
        vehicleType: d.vehicleType || null,
        preferredVehicle: d.preferredVehicle || null,
        budget: d.budget || null,
        hasTradeIn: d.hasTradeIn || null,
        creditRating: d.creditRating || null,
        employmentStatus: d.employmentStatus || null,
        incomeType: d.incomeType || null,
        annualIncome: d.annualIncome || d.annualSalary || null,
        monthlyPayment: d.monthlyPayment || d.monthlyRent || null,
        companyName: d.companyName || null,
        jobTitle: d.jobTitle || null,
        homeStatus: d.homeStatus || null,
        carId: d.carId || d.selectedCarId || null,
        carTitle: d.carTitle || d.selectedCarTitle || null,
        carPrice: d.carPrice || d.selectedCarPrice ? parseFloat(d.carPrice || d.selectedCarPrice) : null,
        extraData: d.extraData ? JSON.stringify(d.extraData) : (body.data ? JSON.stringify(body.data) : null),
        status: "new",
      },
    });

    const typeLabels = {
      "pre-qualify": "Pre-Qualification",
      "finance": "Finance Application",
      "get-details": "Get Details Request",
      "sell-car": "Sell/Trade Request",
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
