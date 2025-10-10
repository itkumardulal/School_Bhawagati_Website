import axios from "axios";

const baseURL = import.meta.env.VITE_URL || "http://localhost:4000";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: false, // Don't send cookies for public endpoints
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
