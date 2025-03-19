import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    regnum: "",
    email: "",
    year: "",
    course: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.regnum = action.payload.regnum; // Corrected this line
      state.email = action.payload.email;
      state.year = action.payload.year;
      state.course = action.payload.course;
      state.profile = action.payload.profile;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.name = "";
      state.regnum = "";
      state.email = "";
      state.year = "";
      state.course = "";
      state.profile = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
