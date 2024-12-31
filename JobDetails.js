import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find((job) => job.id === id);

  if (!job) return <h2>Job not found!</h2>;

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
    </div>
  );
};

export default JobDetails;
