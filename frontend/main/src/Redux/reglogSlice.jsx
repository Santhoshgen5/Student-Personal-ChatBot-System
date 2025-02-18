import { createSlice } from "@reduxjs/toolkit";

const reglogSlice = createSlice({
  name: "setregister",
  initialState: {
    isRegister: false,
  },
  reducers: {
    setRegister: (state, action) => {
      state.isRegister = action.payload.isRegister;
    },
    clearRegister: (state) => {
      state.isRegister = false;
    },
  },
});

export const { setRegister, clearRegister } = reglogSlice.actions;
export default reglogSlice.reducer;
