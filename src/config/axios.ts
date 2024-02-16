import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.DPO_BASE_URL || "https://secure.3gdirectpay.com/API",
  headers: {
    "Content-Type": "application/xml",
  },
});
