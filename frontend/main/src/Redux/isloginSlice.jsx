import { createSlice } from "@reduxjs/toolkit";

// Retrieve login state from localStorage
const initialLoginState = localStorage.getItem("isLogin") === "true";

const isLoginSlice = createSlice({
  name: "islogin",
  initialState: {
    islogin: initialLoginState,
  },
  reducers: {
    setIslogin: (state, action) => {
      console.log(action.payload);
      state.islogin = action.payload; // Set login state
      localStorage.setItem("isLogin", action.payload); // Update localStorage
    },
    clearIslogin: (state) => {
      state.islogin = false; // Clear login state
      localStorage.removeItem("isLogin"); // Remove from localStorage
    },
  },
});

export const { setIslogin, clearIslogin } = isLoginSlice.actions;
export default isLoginSlice.reducer;
