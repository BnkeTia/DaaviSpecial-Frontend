// src/features/daavi/myUserSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://daavispecial-backend.onrender.com/api/";

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const registerUsers = createAsyncThunk('myuser/registerUser', async (userData) => {
  console.log('firs of all', userData);
  const response = await axios.post(`${baseURL}customers/`, { user: userData });
  console.log('ddddddddddd',response.data)
  return response.data;
});


export const registerUser = createAsyncThunk(
  "myuser/registerUser",
  async (args, { rejectWithValue }) => {
    try {
    //   let response = await axiosDannyInstance.get(`/users/user/${args}`);
    console.log('firs of all', args);
      let response = await axios.post(`${baseURL}customers/`, {user: args});
      
      return response.data;
      // 
    } catch (error) {
      console.log("error getmenus", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk('myuser/loginUser', async (credentials) => {
  const response = await axios.post(`${baseURL}login`, credentials);
  Cookies.set('token', response.data.token);
  return response.data;
});

export const myUserSlice = createSlice({
  name: "myuser",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      Cookies.remove('token');
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
        console.log('succeeded', state.user)
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
