import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apis/usersApi";
import usersSlice from "./services/usersSlice";
import { blogsApi } from "./apis/blogsApi";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [blogsApi.reducerPath]: blogsApi.reducer,
        users: usersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware, blogsApi.middleware),
});
