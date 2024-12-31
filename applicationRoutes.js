const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Apply for a Job (Candidate Only)
router.post("/apply/:jobId", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (req.user.role !== "candidate") return res.status(403).json({ message: "Access denied" });

    const { coverLetter } = req.body;
    const { jobId } = req.params;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Create application
    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      resume: req.file.path,
      coverLetter,
    });

    await application.save();

    // Add application to the job's applications array
    job.applications.push(application._id);
    await job.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Applications for a Job (Employer Only)
router.get("/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if user is the employer who posted the job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" });

    const applications = await Application.find({ job: jobId }).populate("applicant", "name email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const { applyForJob, getApplicationsForJob } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/auth");
router.post("/apply/:jobId", authMiddleware, upload.single("resume"), applyForJob);
router.get("/:jobId", authMiddleware, getApplicationsForJob);

module.exports = router;
