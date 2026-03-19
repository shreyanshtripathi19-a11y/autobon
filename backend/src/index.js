const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/cars");
const uploadRoutes = require("./routes/upload");
const adminRoutes = require("./routes/admin");
const accountRoutes = require("./routes/accounts");
const contactRoutes = require("./routes/contact");
const formRoutes = require("./routes/forms");
const reviewRoutes = require("./routes/reviews");
const csvImportRoutes = require("./routes/csvImport");

const app = express();
const prisma = new PrismaClient();

// Make prisma available in routes
app.locals.prisma = prisma;

// ─── Security ───────────────────────────────────────────────────────────────────

// Helmet: sets security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow image serving cross-origin
}));

// CORS: allow frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3001",
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ─── Rate Limiting ──────────────────────────────────────────────────────────────

// General API rate limit: 100 requests per 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for auth routes: 20 requests per 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Upload rate limit: 30 per 15 min
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: "Too many uploads, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Middleware ──────────────────────────────────────────────────────────────────

app.use(compression());  // Gzip responses
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));  // Logging
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: "1d",  // Cache uploaded images for 1 day
  etag: true,
}));

// Apply general rate limiting to all API routes
app.use("/api", generalLimiter);

// ─── API Routes ─────────────────────────────────────────────────────────────────

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/upload", uploadLimiter, uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin/csv-import", csvImportRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
    uptime: Math.round(process.uptime()),
  });
});

// ─── Error Handling ─────────────────────────────────────────────────────────────

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File too large. Maximum size is 10MB." });
  }

  // CORS error
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS policy violation" });
  }

  // Prisma known errors
  if (err.code === "P2025") {
    return res.status(404).json({ message: "Record not found" });
  }
  if (err.code === "P2002") {
    return res.status(409).json({ message: "A record with this value already exists" });
  }

  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error",
  });
});

// ─── Start Server ───────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Autobon backend running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
