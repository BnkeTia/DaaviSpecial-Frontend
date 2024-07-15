import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

let authTokens = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

let refreshToken = localStorage.getItem("refresh_token");

const axiosAuthInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    // Authorization: `Bearer ${localStorage.getItem('access_token')}`
    Authorization: localStorage.getItem("access_token")
      ? "BEARER " + localStorage.getItem("access_token")
      : null,
  },
});

export default axiosAuthInstance;
