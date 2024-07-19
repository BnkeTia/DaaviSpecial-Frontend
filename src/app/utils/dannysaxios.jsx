// src/app/utils/dannysAxiosInstance.jsx
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const baseURL = "https://daavispecial-backend.onrender.com/api/";

let access_token = Cookies.get("access_token");
let refresh_token = Cookies.get("refresh_token");

const axiosDannyInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

axiosDannyInstance.interceptors.request.use(
  async (req) => {
    if (!access_token) {
      access_token = Cookies.get("access_token");
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    const user = jwtDecode(access_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    if (isExpired) {
      const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refresh_token });
      Cookies.set("access_token", response.data.access);
      Cookies.set("refresh_token", response.data.refresh);
      req.headers.Authorization = `Bearer ${response.data.access}`;
      access_token = response.data.access;
      refresh_token = response.data.refresh;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosDannyInstance;
