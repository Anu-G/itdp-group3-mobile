import { createSlice } from "@reduxjs/toolkit"

export const profileSlice = createSlice({
   name: 'profile',
   initialState: {
      profileImage: '',
   },
   reducers: {
      getProfile: (state, action) => {
         state.profileImage = action.payload.profileImage;
      },
      removeProfile: (state) => {
         state.profileImage = '';
      }
   }
});

export const { getProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;