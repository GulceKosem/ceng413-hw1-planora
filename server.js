
const express = require("express");
const path = require("node:path");

const { generateStudyPlan } = require("./src/scheduler");

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Middleware
app.use(express.json());

// Serve frontend files from src/public
app.use(express.static(path.join(__dirname, "src", "public")));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: process.env.APP_NAME || "Planora"
  });
});

// Application configuration
app.get("/api/config", (req, res) => {
  res.json({
    appName: process.env.APP_NAME || "Planora",
    defaultDailyHours: 3
  });
});

// Generate study schedule
app.post("/api/plan", (req, res) => {
  try {
    const { topics, deadline, dailyHours } = req.body || {};

    const plan = generateStudyPlan(
      topics,
      deadline,
      dailyHours
    );

    res.json(plan);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Planora running at http://localhost:${PORT}`);
});
