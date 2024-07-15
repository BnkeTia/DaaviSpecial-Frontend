import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { redirect, useNavigate } from "react-router-dom";

const FetchContext = createContext();

export default FetchContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  let loginUser = async (e) => {
    e.preventDefault();
    // console.log('formsubmitted')
    // const body = JSON.stringify({
    //   email: null,
    //   password: null,
    // })

    let response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("data:", data);
    // console.log('response:', response)
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");

      console.log("user:", user);
    } else {
      console.warn("response is bad");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    console.log("update token called");
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        // Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    let data = await response.json();
    console.log("my refresh:", data);
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <FetchContext.Provider value={contextData}>
      {loading ? null : children}
    </FetchContext.Provider>
  );
};
