import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? "http://localhost:8080",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAwMDAwMDAwIiwicm9sZSI6IlNQX0FETUlOIiwibmJmIjoxNzMwMTQwOTE4LCJleHAiOjE3MzAyMjczMTgsImlhdCI6MTczMDE0MDkxOH0.pLBsarjNNXGdQcfjfH63i9BrKG2xFO62m55gKFDWCwM",
  },
});

export default api;
