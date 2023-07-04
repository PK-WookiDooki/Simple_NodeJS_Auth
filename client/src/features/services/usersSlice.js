import { createSlice } from "@reduxjs/toolkit";
import cookie from "cookiejs";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      cookie.set("user", JSON.stringify(state.user));
      cookie.set("token", state.token);
    },

    removeUser: (state, { payload }) => {
      state.user = null;
      state.token = null;
      cookie.remove("user");
      cookie.remove("token");
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
