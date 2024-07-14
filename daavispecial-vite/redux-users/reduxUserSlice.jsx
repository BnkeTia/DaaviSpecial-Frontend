import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const reduxUserSlice = createSlice({
  name: "reduxuser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("action", action);
      state.users = [...state.users, action.payload];
    },
    editUsers: (state, action) => {
      const { id, name, email } = action.payload;
      // const editedUser = state.users.find(
      //   (user) => user.id === action.payload.id,
      // )
      // if (editedUser) {
      //   editedUser.name = action.payload.name
      //   editedUser.email = action.payload.email
      // }
      const updatedUser = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.users = updatedUser;
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id != id);

      // const existingUser = state.find(user => user.id === id);
      // if(existingUser) {
      //   return state.filter(user => user.id !== id);
      // }
    },
  },
});

export const { addUser, editUsers, deleteUser } = reduxUserSlice.actions;
export default reduxUserSlice.reducer;
