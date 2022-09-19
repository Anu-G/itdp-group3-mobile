import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userName: '',
      accountId: 0,
      roleId: 0,
   },
   reducers: {
      login: (state, action) => {
         state.userName = action.payload.userName;
         state.accountId = action.payload.accountId;
         state.roleId = action.payload.roleId;
      },
      logout: (state) => {
         state.userName = '';
         state.accountId = 0;
         state.roleId = 0;
      }
   }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;