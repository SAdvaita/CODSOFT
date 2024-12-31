const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Refers to the Job model
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model (candidate)
    required: true,
  },
  resume: {
    type: String, // URL or path to the resume file
    required: true,
  },
  coverLetter: {
    type: String,
    required: false, // Optional
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"], // Application status
    default: "pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
