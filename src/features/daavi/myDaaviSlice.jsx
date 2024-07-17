import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../app/utils/dannysaxios";
import axiosDannyInstance from "../../app/utils/dannysaxios";
// import axiosAuthInstance from "@/app/utils/Login";
import Cookies from "js-cookie";
// const baseURL = process.env.NODE_ENV === 'production' ? "https://med-info-apps.up.railway.app/api/" : 'http://localhost:8000/api/';
const baseURL =  "https://daavispecial-backend.onrender.com/api/";





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
  categories: [],
  categoryItems: [],
  menus: [],
  menuItems: {}
};


const handleAsyncError = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
};

export const getMenus = createAsyncThunk(
  "mydaavi/getMenus",
  async (args, { rejectWithValue }) => {
    try {
    //   let response = await axiosDannyInstance.get(`/users/user/${args}`);
      let response = await axios.get(`${baseURL}menus/`);
      
      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error getmenus", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getCategories = createAsyncThunk(
  "mydaavi/getCategories",
  async (args, { rejectWithValue }) => {
    try {
    //   let response = await axiosDannyInstance.get(`/users/user/${args}`);
      let response = await axios.get(`${baseURL}categories/`);
      
      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error GETcATEGORIES", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getCategoryItems = createAsyncThunk(
  "mydaavi/getCategoryItems",
  async (args, { rejectWithValue }) => {
    try {
    //   let response = await axiosDannyInstance.get(`/users/user/${args}`);
      let response = await axios.get(`${baseURL}categories/${args}/menu-items/`);

      // if (response.status === 200) {
      return response.data;
      // }
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const myDaaviSlice = createSlice({
  name: "mydaavi",
  initialState,
  reducers: {
    
    },
    

  extraReducers: (builder) => {
    builder
    .addCase(getMenus.pending, (state, action) => {
        state.loading = true;
    })
    .addCase(getMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
        // console.log('categories', state.categories)
    })
    .addCase(getMenus.rejected, handleAsyncError)
    .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        // console.log('categories', state.categories)
    })
    .addCase(getCategories.rejected, handleAsyncError)
    .addCase(getCategoryItems.pending, (state, action) => {
        state.loading = true;
    })
    .addCase(getCategoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryItems = action.payload;
        // console.log('categoryItems')
    })
    .addCase(getCategoryItems.rejected, handleAsyncError)
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { } =
  myDaaviSlice.actions;

export default myDaaviSlice.reducer;
