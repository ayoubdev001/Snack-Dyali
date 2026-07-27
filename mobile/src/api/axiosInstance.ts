import axios from "axios";

const BASE_URL = "http://192.168.1.9:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);

export default api;