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
  loading: false,
  entities: [],
  categories: [],
  categoryItems: [],
  menus: [],
  menuItems: {},
  orders: [],
  myOrders:[]
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

export const addOrderItem = createAsyncThunk(
  "mydaavi/addOrderItem",
  async (orderItemData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}order-items/`, orderItemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createOrders = createAsyncThunk(
  "mydaavi/createOrders",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}orders/`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const createOrder = createAsyncThunk(
  "mydaavi/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      console.log('payload', payload)
      let response = await axiosDannyInstance.post(`orders/`, payload);
      console.log('response,', response)
      return response.data;
    } catch (error) {
      console.log("Error creating order", error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getOrders = createAsyncThunk(
  "mydaavi/getOrders",
  async (payload, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(`orders/`);
      return response.data;
    } catch (error) {
      console.log("Error getting order", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addItemToOrder = createAsyncThunk(
  "mydaavi/addItemToOrder",
  async ({ orderId, payload }, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.post(`${baseURL}orders/${orderId}/add_items/`, payload);
      return response.data;
    } catch (error) {
      console.log("Error adding item to order", error.response);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "mydaavi/deleteOrder",
  async ( orderId , { rejectWithValue }) => {
    try {
      console.log('id to be deleted', orderId);
      let response = await axiosDannyInstance.delete(`orders/${orderId}/`);
      return orderId; 
    } catch (error) {
      console.log("Error deleting order", error.response);
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
    .addCase(addOrderItem.pending, (state) => {
      state.loading = true;
    })
    .addCase(addOrderItem.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.push(action.payload);
    })
    .addCase(addOrderItem.rejected, handleAsyncError)
    .addCase(createOrders.pending, (state) => {
      state.loading = true;
    })
    .addCase(createOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.push(action.payload);
    })
    .addCase(createOrders.rejected, handleAsyncError)
    .addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
    })
    .addCase(createOrder.rejected, handleAsyncError)
    .addCase(addItemToOrder.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addItemToOrder.fulfilled, (state, action) => {
      state.loading = false;
      const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
      if (orderIndex !== -1) {
        state.orders[orderIndex] = action.payload;
      }
    })
    .addCase(addItemToOrder.rejected, handleAsyncError)
    .addCase(getOrders.pending, (state, action) => {
      state.loading = true;
  })
  .addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
      // console.log('categories', state.categories)
  })
  .addCase(getOrders.rejected, handleAsyncError)
  .addCase(deleteOrder.pending, (state) => {
    state.loading = true;
  })
  .addCase(deleteOrder.fulfilled, (state, action) => {
    state.loading = false;
    // Remove the order with the ID from the state
    state.myOrders = state.myOrders.filter(order => order.id !== action.payload);
  })
  .addCase(deleteOrder.rejected, handleAsyncError);
    
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { } =
  myDaaviSlice.actions;

export default myDaaviSlice.reducer;
