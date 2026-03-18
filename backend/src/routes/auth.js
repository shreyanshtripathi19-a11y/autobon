const express = require("express");
const bcrypt = require("bcryptjs");
const { createToken, requireAuth, COOKIE_NAME } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const prisma = req.app.locals.prisma;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email: email.toLowerCase(), password: hashedPassword, role: "USER" },
    });

    const token = createToken(user);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user.id, name: user.name, email: user.email, role: user.role,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const prisma = req.app.locals.prisma;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      id: user.id, name: user.name, email: user.email, role: user.role,
      token, message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user.id, name: user.name, email: user.email, role: user.role,
      phone: user.phone, firstName: user.firstName, middleName: user.middleName,
      lastName: user.lastName, dob: user.dob, address: user.address,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ message: "Logged out successfully" });
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const prisma = req.app.locals.prisma;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      // Don't reveal whether the email exists
      return res.json({ message: "If this email is registered, a reset code has been sent." });
    }

    // Generate 6-digit reset code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await prisma.user.update({
      where: { id: user.id },
      data: { resetCode: code, resetCodeExpiry: expiry },
    });

    // In production, send via email. For dev, log to console.
    console.log(`\n========================================`);
    console.log(`  PASSWORD RESET CODE for ${email}`);
    console.log(`  Code: ${code}`);
    console.log(`  (Valid for 15 minutes)`);
    console.log(`========================================\n`);

    res.json({
      message: "If this email is registered, a reset code has been sent.",
      ...(process.env.NODE_ENV !== "production" && { code }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/verify-code
router.post("/verify-code", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const prisma = req.app.locals.prisma;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and verification code are required" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user || !user.resetCode || !user.resetCodeExpiry) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    if (new Date(user.resetCodeExpiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // If newPassword provided, update the password
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, resetCode: null, resetCodeExpiry: null },
      });
      return res.json({ message: "Password updated successfully", verified: true, passwordReset: true });
    }

    // Just verify the code
    res.json({ message: "Code verified successfully", verified: true });
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
