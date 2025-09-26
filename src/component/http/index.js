import axios from "axios";

const baseURL = import.meta.env.VITE_URL;


const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
