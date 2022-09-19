import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Login/Slice/AuthSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer
   }
});