import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? "http://localhost:5292",
});

export default api;
