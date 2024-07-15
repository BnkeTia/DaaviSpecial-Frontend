import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../app/utils/dannysaxios";
import axiosDannyInstance from "../../app/utils/dannysaxios";
// import axiosAuthInstance from "@/app/utils/Login";
import Cookies from "js-cookie";
const baseURL = process.env.NODE_ENV === 'production' ? "https://med-info-apps.up.railway.app/api/" : 'http://localhost:8000/api/';





// Retrieve authentication tokens from cookies.
const getAuthTokensFromCookies = () => {
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  return { access_token, refresh_token };
};

const userProfileCookie = Cookies.get("userProfile");
const tryUserFromStorage = userProfileCookie ? userProfileCookie : {};



const initialState = {
  entities: [],
  users: [],
  userProfile: {},
  errors: [],
  isAuthenticated: false,
  // user: null,
  loading: false,
  registered: false,
  token: "",
  refresh: "",
  access: "",
  user: {
    token: "",
    name: "",
    email: "",
    first_name: "",
  },
  tryUser: tryUserFromStorage,
  tokenUser: {},
  facebook: {},
};

export const getUsers = createAsyncThunk(
  "myuser/getUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get("users/list");
      // console.log('user response res', response)
      if (response.status === 200) {
        // console.log('user response', response.data)
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getProfile = createAsyncThunk(
  "myuser/getProfile",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`/users/user/${args}`);

      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "myuser/getUserInfo",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`/users/user-profile/`);

      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "myuser/updateUser",
  async (args, { rejectWithValue }) => {
    console.log("args", args);
    try {
      let response = await axiosDannyInstance.put(
        `users/user-profile/${args.id}/`,
        args.formData
      );
      console.log("update user response:  ", response.data);
      if (response.data === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("error", error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);



export const tokenLogin = createAsyncThunk(
  "myuser/tokenLogin",
  async (args, thunkAPI) => {
    try {
      let response = await axiosInstance.post(`${baseURL}token/`, args);

      if (response.status === 200) {
        // Set the access_token and refresh_token cookies.
        Cookies.set("access_token", response.data.access);
        Cookies.set("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + Cookies.get("access_token");

        return response.data;
      }

      // console.log('finally');
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const mytoken = createAsyncThunk(
  "myuser/mytoken",
  async ({ email, password }, thunkAPI) => {
    try {
      let response = await axios.post(`${baseURL}token/`, {

        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Set the access_token and refresh_token cookies.
        console.log('u used here')
        Cookies.set("access_token", response.data.access);
        Cookies.set("refresh_token", response.data.refresh);
        axiosDannyInstance.defaults.headers["Authorization"] =
          "Bearer " + Cookies.get("access_token");

        return response.data;
      }
    } catch (err) {
      console.error("inuserslice token error", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);




export const register = createAsyncThunk(
  "myuser/register",
  //   async ({first_name, last_name,email,password}, thunkAPI) => {
  async (args, thunkAPI) => {
    // console.log("args", args);
    // const body = JSON.stringify({
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    // })
    // const body = { first_name, last_name, email, password }
    try {
      let response = await axios.post(

        `${baseURL}users/register/`,
        args
      );

      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }


    } catch (err) {
      console.error("inuserslice", err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const myUserSlice = createSlice({
  name: "myuser",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
    logoutJWT: (state, action) => {
      state.users = [];
      state.tryUser = {};

      state.isAuthenticated = false;


      // Remove cookies instead of using localStorage.clear()
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("isRegistered");
      Cookies.remove("isAuthenticated");
      Cookies.remove("local_user");
      Cookies.remove("userProfile");
    },
    addUserToTeam: (state, action) => {
      state.tryUser.team = [action.payload];

    },
    getUser: (state, action) => {
      state.tryUser = state.tryUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(mytoken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(mytoken.fulfilled, (state, action) => {


      // console.log("it works", action.payload);
      // console.log("it succeeded dont .......");

      state.entities.push(action.payload);
      state.token = action.payload.access;

      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.user.token = action.payload.access;
      state.tryUser = jwtDecode(action.payload.access);
      state.tryUser = jwtDecode(action.payload.access);

      Cookies.set("username", state.tryUser.username[0]);
      Cookies.set("isAuthenticated", state.isAuthenticated)
      Cookies.set("local_user", jwtDecode(action.payload.access));
      Cookies.set("access_token", action.payload.access);
      Cookies.set("userProfile", state.tryUser);

      // Use Cookies to set values
      // Cookies.set("userProfile", JSON.stringify(state.tryUser));
      // Cookies.set("isAuthenticated", JSON.stringify(state.isAuthenticated));
      Cookies.set("isRegistered", JSON.stringify(state.isAuthenticated));
      // // Use Cookies to set values
      // Cookies.set("local_user", JSON.stringify(jwtDecode(action.payload.access)));

    });
    builder.addCase(mytoken.rejected, (state, action) => {
      console.log(' it did not work', action.payload);
      state.loading = false;
    });

    builder.addCase(tokenLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(tokenLogin.fulfilled, (state, action) => {
      console.log("it succeededed", action);



      state.entities.push(action.payload);
      state.token = action.payload.access;
      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;
      state.user.token = action.payload.access;
      state.tryUser = jwtDecode(action.payload.access);
      console.log("tryUser", state.tryUser.email)

      Cookies.set("isAuthenticated", state.isAuthenticated)
      Cookies.set("local_user", jwtDecode(action.payload.access));
      Cookies.set("access_token", action.payload.access);

      // console.log()
      // // Use Cookies to set values
      // Cookies.set("isAuthenticated", JSON.stringify(state.isAuthenticated));
      // // Use Cookies to set values
      // Cookies.set("local_user", JSON.stringify(jwtDecode(action.payload.access)));

    });
    builder.addCase(tokenLogin.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log("it succeeded action. payload in getProfile  :  :", action.payload);

      // Use Cookies to set values
      Cookies.set("userProfile", JSON.stringify(action.payload));

      return {
        ...state,
        userProfile: action.payload,
        registered: true,
        isAuthenticated: true,
      };
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      return {
        loading: false,
        errors: action.payload,
      };
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("acion payload for update:", action.payload);
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        loading: false,
        errors: action.payload,
      };
    });
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = true;
      state.isAuthenticated = true;

      // Use Cookies to set values
      Cookies.set("userProfile", JSON.stringify(action.payload.results));

      state.userProfile = action.payload.results;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
    });


  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { resetRegistered, logoutJWT, addUserToTeam, getUser } =
  myUserSlice.actions;

export default myUserSlice.reducer;
