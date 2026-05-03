import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
export interface AuthState {
  user: null | User;
  token: null | string;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SaveAuth: (
      state,
      actions: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.token = actions.payload.token;
      state.user = actions.payload.user;
      localStorage.setItem("token", actions.payload.token);
      localStorage.setItem("user", JSON.stringify(actions.payload.user));
    },
    ClrearAuth: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { SaveAuth, ClrearAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
