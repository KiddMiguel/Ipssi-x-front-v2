import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./Posts/postSlice";
import messageReducer from "./messages/messageSlice";
import authPersistMiddleware from "./Middelware/authPersistMiddleware";

export const store = configureStore({
  reducer: {
    post: postReducer,
    message: messageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authPersistMiddleware),
});

export default store;
