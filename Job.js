const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: false, // Optional
  },
  requirements: {
    type: [String], // Array of strings
    required: false,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model (employer)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application", // Refers to the Application model
    },
  ],
});

module.exports = mongoose.model("Job", JobSchema);
