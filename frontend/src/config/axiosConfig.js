import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json", // Set content type if needed
  },
  withCredentials: true, // Include credentials (cookies, authorization headers) if needed
});

export default apiClient;
