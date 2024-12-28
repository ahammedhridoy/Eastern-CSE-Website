import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin":
      "https://eastern-cse-website-frontend.vercel.app",
  },
});

export default apiClient;
