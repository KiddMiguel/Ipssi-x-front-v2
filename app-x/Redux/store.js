import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./Posts/postSlice";
import messageReducer from "./messages/messageSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    message: messageReducer,
    auth: authReducer,
  },
});

export default store;
