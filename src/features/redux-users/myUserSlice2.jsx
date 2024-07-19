import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://daavispecial-backend.onrender.com/api/";

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: "",
  refresh: "",
  access: "",
  user: {
    token: "",
    name: "",
    email: "",
    first_name: "",
  },
};

const getAuthTokensFromCookies = () => {
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  return { access_token, refresh_token };
};

const userProfileCookie = Cookies.get("userProfile");

export const registerUser = createAsyncThunk(
  "myuser/registerUser",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${baseURL}customers/`, { user: args });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'myuser/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}token/`, credentials);
      Cookies.set('access_token', response.data.access);
      Cookies.set('refresh_token', response.data.refresh);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const tokenLogin = createAsyncThunk(
  "my/tokenLogin",
  async (args, thunkAPI) => {
    try {
      let response = await axios.post(`${baseURL}token/`, args);

      if (response.status === 200) {
        Cookies.set("access_token", response.data.access);
        Cookies.set("refresh_token", response.data.refresh);
        axios.defaults.headers["Authorization"] = "JWT " + Cookies.get("access_token");

        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const myUserSlice = createSlice({
  name: "myuser",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { logoutUser } = myUserSlice.actions;

export default myUserSlice.reducer;
