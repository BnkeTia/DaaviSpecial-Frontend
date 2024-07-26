import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure proper import
import dayjs from "dayjs";
import Cookies from "js-cookie";

// const baseURL = "https://daavispecial-backend.onrender.com/api/";

// // Helper function to get and validate tokens
// const getToken = (tokenName) => {
//   const token = Cookies.get(tokenName);
//   return (typeof token === "string" && token) ? token : null;
// };

// // Initialize tokens
// let accessToken = getToken("access_token");
// let refreshToken = getToken("refresh_token");

// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   accessToken = getToken("access_token");
//   refreshToken = getToken("refresh_token");

//   if (!accessToken) {
//     return req;
//   }

//   let decodedToken;
//   try {
//     decodedToken = jwtDecode(accessToken);
//   } catch (error) {
//     console.error("Invalid token specified:", error);
//     return req;
//   }

//   const isExpired = dayjs.unix(decodedToken.exp).isBefore(dayjs());

//   if (!isExpired) {
//     req.headers.Authorization = `Bearer ${accessToken}`;
//     return req;
//   }

//   try {
//     const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
//     accessToken = response.data.access;
//     refreshToken = response.data.refresh;

//     Cookies.set("access_token", accessToken);
//     Cookies.set("refresh_token", refreshToken);

//     req.headers.Authorization = `Bearer ${accessToken}`;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//   }

//   return req;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;




// import axios from "axios";
// import {jwtDecode} from "jwt-decode";
// import dayjs from "dayjs";
// import Cookies from "js-cookie";

// const baseURL = "https://daavispecial-backend.onrender.com/api/";

// let access_token = Cookies.get("access_token");
// let refresh_token = Cookies.get("refresh_token");

// const axiosDannyInstance = axios.create({
//   baseURL,
//   headers: {
//     Authorization: `Bearer ${access_token}`,
//   },
// });

// axiosDannyInstance.interceptors.request.use(
//   async (req) => {
//     if (!access_token) {
//       access_token = Cookies.get("access_token");
//       req.headers.Authorization = `Bearer ${access_token}`;
//     }

//     const user = jwtDecode(access_token);
//     // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//     const isExpired = dayjs.unix(jwtDecode(access_token).exp).isBefore(dayjs());


//     if (!isExpired) return req;

//     if (isExpired) {
//       const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refresh_token });
//       Cookies.set("access_token", response.data.access);
//       Cookies.set("refresh_token", response.data.refresh);
//       req.headers.Authorization = `Bearer ${response.data.access}`;
//       access_token = response.data.access;
//       refresh_token = response.data.refresh;
//     }

//     return req;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosDannyInstance;


const baseURL = "https://daavispecial-backend.onrender.com/api/";

// Helper function to get and validate tokens
const getToken = (tokenName) => {
  const token = Cookies.get(tokenName);
  return (typeof token === "string" && token) ? token : null;
};

// Initialize tokens
let accessToken = getToken("access_token");
let refreshToken = getToken("refresh_token");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  accessToken = getToken("access_token");
  refreshToken = getToken("refresh_token");

  if (!accessToken) {
    return req;
  }

  let decodedToken;
  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    console.error("Invalid token specified:", error);
    return req;
  }

  const isExpired = dayjs.unix(decodedToken.exp).isBefore(dayjs());

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  }

  try {
    const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
    accessToken = response.data.access;
    refreshToken = response.data.refresh;

    Cookies.set("access_token", accessToken);
    Cookies.set("refresh_token", refreshToken);

    req.headers.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }

  return req;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;