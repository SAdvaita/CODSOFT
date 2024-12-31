import React from "react";
import { Link } from "react-router-dom";

const JobList = ({ jobs }) => {
  return (
    <div className="row">
      {jobs.map((job) => (
        <div className="col-md-4 mb-4" key={job.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text">{job.company}</p>
              <p className="card-text text-muted">{job.location}</p>
              <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
