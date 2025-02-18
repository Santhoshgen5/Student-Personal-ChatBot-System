import { configureStore } from "@reduxjs/toolkit";

import reglogslice from "./reglogSlice";
import std_staff from "./std_or_staffSlice";
import isLoginReducer from "./isloginSlice";
import userreducer from "./userSlice"


const store = configureStore({
  reducer: {
    reglog: reglogslice,
    std_staff: std_staff,
    islogin: isLoginReducer,
    user: userreducer
  },
});

export default store;
