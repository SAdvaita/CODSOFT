import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend URL

// Fetch all jobs
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Fetch job details by ID
export const fetchJobDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

// Submit a job application
export const submitApplication = async (jobId, formData) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, { jobId, ...formData });
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// User registration
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
