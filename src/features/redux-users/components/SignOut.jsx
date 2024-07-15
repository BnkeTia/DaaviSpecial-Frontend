import React, { useEffect } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import axiosDannyInstance from "@/app/utils/dannysaxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"; // Import Cookies library
import { logoutJWT } from "@/features/redux-users/myUserSlice";

export default function SignOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Use Cookies to get the refresh_token
    const refresh_token = Cookies.get("refresh_token");

    // Send a request to logout and blacklist the refresh_token
    const response = axiosDannyInstance.post("users/logout/blacklist/", {
      refresh_token,
    });

    dispatch(logoutJWT());

    // Remove cookies instead of using localStorage.removeItem
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("isRegistered");
    Cookies.remove("isAuthenticated");
    Cookies.remove("local_user");
    Cookies.remove("userProfile");
    Cookies.remove("username");
    console.log("u just visisted the signout page");

    // Clear the authorization headers
    axiosInstance.defaults.headers["Authorization"] = null;
    axiosDannyInstance.defaults.headers["Authorization"] = null;

    // Navigate to the desired route
    // window.location.reload();
    // navigate("/psignin")
    // setTimeout(()=>{
    //   navigate("/")
    // }, 10)
    navigate("/")
    // window.location.replace("/psignin")

  }, [dispatch, navigate]);

  return <div>Logout</div>;
}







// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/app/utils/axiosInstance";
// import axiosDannyInstance from "@/app/utils/dannysaxios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutJWT } from "@/features/redux-users/myUserSlice";
// import Cookies from "js-cookie"; // Import Cookies library

// export default function SignOut() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const response = axiosDannyInstance.post("users/logout/blacklist/", {
//       refresh_token: localStorage.getItem("refresh_token"),
//     });
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("isRegistered");
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("local_user");
//     localStorage.removeItem("userProfile");
//     localStorage.removeItem("team");
//     localStorage.removeItem("teams");
//     // localStorage.clear()
//     axiosInstance.defaults.headers["Authorization"] = null;
//     axiosDannyInstance.defaults.headers["Authorization"] = null;
//     // window.location.reload();
//     // navigate("/psignin")
//     // setTimeout(()=>{
//     //   navigate("/")
//     // }, 10)
//     navigate("/")
//     // window.location.replace("/psignin")
//     window.location.replace("/")
//     setTimeout(() => {
//       navigate('/')
//       // window.location.replace("/")
//     }, 900)



//   }, []);
//   return <div>Logout</div>;
// }
