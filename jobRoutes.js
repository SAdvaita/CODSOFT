const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Create a Job Posting (Employer Only)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") return res.status(403).json({ message: "Access denied" });

    const { title, description, company, location, salary, requirements } = req.body;

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      requirements,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get All Job Listings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Job Details by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;


const express = require("express");
const { createJob, getAllJobs, getJobDetails } = require("../controllers/jobController");
const authMiddleware = require("../middleware/auth");
router.post("/create", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobDetails);

module.exports = router;
