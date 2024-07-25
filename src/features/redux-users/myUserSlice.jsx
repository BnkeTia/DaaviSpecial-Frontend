import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const baseURL = "https://daavispecial-backend.onrender.com/api/";

const userProfileCookie = Cookies.get("userProfile");
const userFromStorage = userProfileCookie ? userProfileCookie : {};


const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
  token: Cookies.get('access_token') || "",
  refresh: Cookies.get('refresh_token') || "",
  userCustomer: {
    token: "",
    name: "",
    email: "",
    first_name: "",
  },
  customer: userFromStorage,
  userInfo: "",
  loading: "false"
  
};




export const registerUser = createAsyncThunk(
  "myuser/registerUser",
  async (args, { rejectWithValue }) => {
    try {
      console.log('register responb args ', args);
      const response = await axios.post(`${baseURL}customers/`, { user: args });
      console.log('register response ', response);
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
      const decoded = jwtDecode(response.data.access);
      console.log('decoded', decoded)
      Cookies.set('access_token', response.data.access, { expires: 1 });
      Cookies.set('refresh_token', response.data.refresh, { expires: 7 }); 
      return { ...response.data, user: decoded };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const userInfo = createAsyncThunk(
  'myuser/userInfo',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('crede in nav', credentials)
      // const username = Cookies.get("username");
      const response = await axios.get(`${baseURL}customers/${credentials}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const checkAuth = createAsyncThunk(
  'myuser/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('access_token');
      if (!token) throw new Error("No token found");
      const decoded = jwtDecode(token);
      return { user: decoded, isAuthenticated: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const myUserSlice = createSlice({
  name: "myuser",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove("isAuthenticated")
      Cookies.remove("username")
      Cookies.remove("userInfo")
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
        state.isAuthenticated = true;
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
        state.isAuthenticated = true;

        state.customer = jwtDecode(action.payload.access);

        Cookies.set("username", state.customer.user_id);
        Cookies.set("isAuthenticated", state.isAuthenticated)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(userInfo.pending, (state) => {
        state.status = 'loading';
        state.loading ="true";
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        console.log('payload', action.payload.user.username)
        state.status = 'succeeded';
        state.loading = "false";
        state.userInfo = action.payload.user.username;
        Cookies.set("userInfo", state.userInfo)
        state.isAuthenticated = true;
        console.log('check infor', state.userInfo)
       
      
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.loading ="true";
        state.error = action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { logoutUser } = myUserSlice.actions;

export default myUserSlice.reducer;



// // src/features/daavi/myUserSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// const baseURL = "https://daavispecial-backend.onrender.com/api/";

// const initialState = {
//   user: null,
//   status: 'idle',
//   error: null
// };




// export const registerUser = createAsyncThunk(
//   "myuser/registerUser",
//   async (args, { rejectWithValue }) => {
//     try {
//     //   let response = await axiosDannyInstance.get(`/users/user/${args}`);
//     console.log('firs of all', args);
//       let response = await axios.post(`${baseURL}customers/`, {user: args});
      
//       return response.data;
//       // 
//     } catch (error) {
//       console.log("error getmenus", error.response);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const loginUser = createAsyncThunk('myuser/loginUser', async (credentials) => {
//   const response = await axios.post(`${baseURL}login`, credentials);
//   Cookies.set('token', response.data.token);
//   return response.data;
// });

// export const myUserSlice = createSlice({
//   name: "myuser",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       Cookies.remove('token');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload.user;
//         console.log('succeeded', state.user)
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

// export const { logoutUser } = myUserSlice.actions;

// export default myUserSlice.reducer;
