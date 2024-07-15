import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// const baseURL = "http://localhost:8000";
const baseURL = process.env.NODE_ENV === 'production' ? "https://med-info-apps.up.railway.app" : 'http://localhost:8000';

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  //   timeout: 1000,
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log("authTokens in instance", authTokens);
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens.access}`;
  }
  console.log("interceptor ran req", req);

  const user = jwtDecode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("check exp", dayjs.unix(user.exp).diff(dayjs()));
  console.log("isExpired", isExpired);
  if (!isExpired) return req;
  //   if (isExpired) {
  const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    refresh: authTokens.refresh,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  //   }

  return req;
});

export default axiosInstance;
