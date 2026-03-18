const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "autobon-super-secret-key-change-in-production";
const COOKIE_NAME = "autobon_token";

/**
 * Create a signed JWT for a user
 */
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verify and decode a JWT
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Middleware: Require authenticated user
 */
function requireAuth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = payload;
  next();
}

/**
 * Middleware: Require admin role
 */
function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
}

module.exports = { createToken, verifyToken, requireAuth, requireAdmin, COOKIE_NAME, JWT_SECRET };
