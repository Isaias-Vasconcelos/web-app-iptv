import axios from "axios";
import Cookies from "js-cookie";

const tokenCookie = () => {
  const token = Cookies.get("token");
  return token;
};

const api = axios.create({
  baseURL: process.env.BACKEND_URL ?? "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + tokenCookie(),
  },
});

export default api;
