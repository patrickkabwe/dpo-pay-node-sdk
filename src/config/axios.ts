import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.DPO_BASE_API_URL,
  headers: {
    "Content-Type": "application/xml",
  },
});
