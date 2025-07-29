import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export default API