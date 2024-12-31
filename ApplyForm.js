import React, { useState } from "react";

const ApplyForm = ({ jobId }) => {
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resume);

    // Send to API
    console.log("Form submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="resume" className="form-label">Upload Resume</label>
        <input
          type="file"
          className="form-control"
          id="resume"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit Application</button>
    </form>
  );
};

export default ApplyForm;
