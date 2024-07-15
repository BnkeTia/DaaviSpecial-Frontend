import axios from "axios";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:8000/api/";

const baseURL = process.env.NODE_ENV === 'production' ? "https://med-info-apps.up.railway.app/api/" : 'http://localhost:8000/api/';

let authTokens = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

let refreshToken = localStorage.getItem("refresh_token");

const axiosDannyInstance = axios.create({
  baseURL,
  //   timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    // 'Content-Type': 'application/json',
    // accept: 'application/json'
    // Authorization: localStorage.getItem('access_token')
    //   ? 'Bearer ' + localStorage.getItem('access_token')
    //   : null
  },
});

axiosDannyInstance.interceptors.request.use(
  // async response => {
  //   console.log('see response', response)
  //   console.log('myhead', axiosDannyInstance.defaults)
  //   return response
  // },
  async (req) => {
    // console.log("authTokens in instance", authTokens);
    if (!authTokens) {
      // authRefresh = localStorage.getItem('refresh_token')
      authTokens = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : null;
      req.headers.Authorization = `Bearer ${authTokens}`;
    }
    // console.log("interceptor ran req", req);
    // console.log('authRefresh', authRefresh)
    console.log("authTokens", authTokens);

    // const user = jwt_decode(authTokens);
    const user = jwtDecode(authTokens);

    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("check exp", dayjs.unix(user.exp).diff(dayjs()));
    console.log("isExpired", isExpired);
    if (!isExpired) return req;
    if (isExpired) {
      const response = await axios.post(`${baseURL}token/refresh/`, {
        refresh: refreshToken,
      });
      console.log("i performed a refresh");
      localStorage.setItem("access_token", response.data.access);

      localStorage.setItem("refresh_token", response.data.refresh);

      req.headers.Authorization = `Bearer ${response.data.access}`;
      refreshToken = localStorage.getItem("refresh_token");
      // console.log("refresh headers", req.headers.Authorization);
    }

    return req;
  }
);

export default axiosDannyInstance;
