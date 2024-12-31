import React, { useState } from "react";
import JobList from "./JobList";
import SearchBar from "./SearchBar";

const JobListings = () => {
  const [jobs, setJobs] = useState([
    // Example data
    { id: "1", title: "Frontend Developer", company: "Google", location: "Remote" },
    { id: "2", title: "Backend Developer", company: "Amazon", location: "Seattle" },
  ]);

  const handleSearch = (searchTerm) => {
    // Filter jobs (replace this with API logic)
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobListings;
