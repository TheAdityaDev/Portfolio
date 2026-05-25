const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
const frontendDistPath = path.join(__dirname, "../frontend/dist");
const configuredOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://adityaportfolio-lyart.vercel.app",
  ...configuredOrigins,
]);

if (process.env.VERCEL_URL) {
  allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    try {
      const { hostname } = new URL(origin);

      if (allowedOrigins.has(origin) || hostname.endsWith(".vercel.app")) {
        return callback(null, true);
      }
    } catch (error) {
      return callback(new Error(`Invalid Origin header: ${origin}`));
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(
  cors(corsOptions),
);
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(express.static(frontendDistPath));

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "API Running" });
});

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.get(/^\/(?!api(?:\/|$)).*/, (req, res) => {
  const indexPath = path.join(frontendDistPath, "index.html");

  if (!fs.existsSync(indexPath)) {
    return res.status(404).json({
      message: "Frontend build not found. Run the frontend build before serving the app.",
    });
  }

  res.sendFile(indexPath);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
