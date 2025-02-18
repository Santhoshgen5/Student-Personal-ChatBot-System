import { createSlice } from "@reduxjs/toolkit";

const std_staffSlice = createSlice({
  name: "std_staff",
  initialState: {
    isstd_staff: null,
  },
  reducers: {
    setstd_staff: (state, action) => {
      state.isstd_staff = action.payload;
    },
    clearstd_staff: (state) => {
      state.isstd_staff = null;
    },
  },
});

export const { setstd_staff, clearstd_staff } = std_staffSlice.actions;
export default std_staffSlice.reducer;
