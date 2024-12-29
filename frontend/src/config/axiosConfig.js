import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// // Public API client
// export const publicApiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
// });

// // Private API client
// export const privateApiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   withCredentials: true, // Include cookies for authentication
// });

export default apiClient;
