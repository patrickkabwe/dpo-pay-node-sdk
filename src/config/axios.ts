import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://secure.3gdirectpay.com/API",
  headers: {
    "Content-Type": "application/xml",
  },
});
