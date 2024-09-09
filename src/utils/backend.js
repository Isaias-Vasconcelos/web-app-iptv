import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? "https://localhost:7131",
});

export default api;
