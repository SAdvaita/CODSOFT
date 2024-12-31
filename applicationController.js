const Application = require("../models/Application");
const Job = require("../models/Job");

// Submit a job application
exports.applyForJob = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { jobId } = req.params;
    const { coverLetter } = req.body;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create a new application
    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      resume: req.file.path,
      coverLetter,
    });

    await application.save();

    // Add the application to the job's applications array
    job.applications.push(application._id);
    await job.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get applications for a specific job (Employer Only)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if the user is the employer who posted the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({ job: jobId }).populate("applicant", "name email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
