// services/axiosService.js
import axios from "axios";

const API_URL = "http://localhost:8085";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
