const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db"); // Database connection
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize dotenv for environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(bodyParser.json()); // For handling JSON payloads
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from 'uploads' directory

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/jobs", jobRoutes); // Job-related routes
app.use("/api/applications", applicationRoutes); // Application-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Job Portal API is running!");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const { errorHandler } = require("./utils/errorHandler");
app.use(errorHandler);
