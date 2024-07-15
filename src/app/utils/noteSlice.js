import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from 'config/config'
import axios from 'axios'
import useAxios from './useAxios'
// import { API_URL } from 'config/index'

const initialState = {
  yawa: [],
  entities: [],
  notes: [],
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  token: '',
  access: '',
  user: {
    token: '',
    name: '',
    email: '',
    first_name: '',
  },
  fulfilled: false,
}
// const api = useAxios()
export const mytoken = createAsyncThunk(
  'myuser/mytoken',
  async ({ email, password }, thunkAPI) => {
    try {
      await axios
        .post('http://localhost:8000/api/token/', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log('my token response', res.data)
          // localStorage.setItem('token', res.data.access)
          const data = res.data
          if (res.status === 201) {
            return data
          } else {
            return thunkAPI.rejectWithValue(data)
          }
        })
        .catch((err) => {
          console.log('token error', err)
        })
      // console.log('umean', response)
    } catch (err) {
      console.error('inuserslice token error', err)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const register = createAsyncThunk(
  'myuser/register',
  //   async ({first_name, last_name,email,password}, thunkAPI) => {
  async (args, thunkAPI) => {
    // const body = JSON.stringify({
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    // })
    // const body = { first_name, last_name, email, password }
    try {
      let response = await axios
        .post('http://localhost:8000/api/users/register', args)
        .then((res) => {
          console.log('myuserresposne', res.data)
        })
        .catch((err) => {
          console.log('mur', err)
        })

      return response
    } catch (err) {
      console.error('inuserslice', err)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const usernote = createAsyncThunk(
  'note/usernote',

  async () => {
    const api = useAxios()
    let response = await api.get('/base/notes/')
    console.log('in notes', response)
    return response.data
    // if (response.status === 200) {
    //   setNotes(response.data)
    //   console.log('axios-response notes', notes)
    // }
  },
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false
    },
    getmynotes: (state, action) => {
      console.log('in notes', action)
      state.notes.push(action.payload)
    },
    mynote: async (state, action) => {},

    extraReducers: (builder) => {
      builder
        .addCase(usernote.pending, (state, action) => {
          state.loading = true
        })
        .addCase(usernote.fulfilled, (state, action) => {
          state.entities.push(action.payload)
          return {
            ...state,
          }
          // state.loading = false
          // state.registered = true
          // state.fulfilled = true
          // state.entities.push(action.payload)
        })
        .addCase(usernote.rejected, (state, action) => {
          state.loading = false
        })
    },
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export const { resetRegistered, getmynotes } = noteSlice.actions

export default noteSlice.reducer
