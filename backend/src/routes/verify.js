const express = require("express");
const twilio = require("twilio");

const router = express.Router();

let twilioClient = null;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (accountSid && authToken && verifyServiceSid) {
  twilioClient = twilio(accountSid, authToken);
} else {
  console.warn("⚠️ Twilio configuration is missing. Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SERVICE_SID are in your .env file.");
}

// POST /api/verify/send-otp
router.post("/send-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    if (!twilioClient) {
      console.warn("⚠️ Twilio is not configured. Simulating OTP send to " + phoneNumber);
      return res.status(200).json({ message: "Simulated OTP sent (Twilio keys missing)" });
    }

    const verification = await twilioClient.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).json({ status: verification.status, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Twilio send OTP error:", error);
    res.status(500).json({ message: error.message || "Failed to send OTP" });
  }
});

// POST /api/verify/check-otp
router.post("/check-otp", async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
      return res.status(400).json({ message: "Phone number and code are required" });
    }

    if (!twilioClient) {
      console.warn(`⚠️ Twilio is not configured. Simulating OTP check for ${phoneNumber} with code ${code}`);
      if (code === "123456") {
         return res.status(200).json({ status: "approved", message: "OTP verified correctly (simulated)" });
      }
      return res.status(400).json({ message: "Invalid verification code (simulated)" });
    }

    const verificationCheck = await twilioClient.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code });

    if (verificationCheck.status === "approved") {
      res.status(200).json({ status: "approved", message: "OTP verified correctly" });
    } else {
      res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    console.error("Twilio check OTP error:", error);
    res.status(500).json({ message: error.message || "Failed to verify OTP" });
  }
});

module.exports = router;
