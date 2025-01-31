import { createSlice } from "@reduxjs/toolkit";
import { register, login, getUsers } from "./authThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isAuthenticated: false,
  isNew: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
  users: [],
};

export const initializeState = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userStr = await AsyncStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      ...initialState,
      isAuthenticated: !!token,
      user,
      token,
    };
  } catch (error) {
    console.error("Error loading initial state:", error);
    return initialState;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
      state.isAuthenticated = false;
      state.isNew = false;
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "success";
      state.isAuthenticated = true;
      state.isNew = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      AsyncStorage.setItem("token", action.payload.token);
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.isAuthenticated = true;
      state.isNew = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      AsyncStorage.setItem("token", action.payload.token);
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message || "Une erreur est survenue";
    });

    // Get users
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export const { setState, logout, clearError } = authSlice.actions;
export { register, login, getUsers };
export default authSlice.reducer;
