import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Login/Slice/AuthSlice";
import profileReducer from "../features/Profile/Slice/ProfileSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      profile: profileReducer
   }
});