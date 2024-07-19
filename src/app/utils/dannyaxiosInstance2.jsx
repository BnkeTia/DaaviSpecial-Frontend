import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const baseURL = "https://daavispecial-backend.onrender.com/api/";

let authTokens = Cookies.get("access_token") ? Cookies.get("access_token") : null;
let refreshToken = Cookies.get("refresh_token");

const axiosDannyInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});

axiosDannyInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = Cookies.get("access_token");
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = jwtDecode(authTokens);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  if (isExpired) {
    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: refreshToken,
    });
    Cookies.set("access_token", response.data.access);
    Cookies.set("refresh_token", response.data.refresh);

    req.headers.Authorization = `Bearer ${response.data.access}`;
    refreshToken = Cookies.get("refresh_token");
  }

  return req;
});

export default axiosDannyInstance;
