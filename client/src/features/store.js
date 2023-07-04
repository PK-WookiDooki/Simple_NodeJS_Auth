import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apis/usersApi";
import usersSlice from "./services/usersSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
