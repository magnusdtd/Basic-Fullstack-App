import axios from "axios";

const API_BASE_URL =
    // "http://localhost:8080" // Local backend URL for development
    "https://basic-fullstack-app-808541460346.asia-southeast1.run.app"; // Production backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;