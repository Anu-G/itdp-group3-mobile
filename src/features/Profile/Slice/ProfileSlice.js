import { createSlice } from "@reduxjs/toolkit"

export const profileSlice = createSlice({
   name: 'profile',
   initialState: {
      profileId: 0,
      profileImage: '',
   },
   reducers: {
      getProfile: (state, action) => {
         state.profileId = action.payload.profileId;
         state.profileImage = action.payload.profileImage;
      },
      removeProfile: (state) => {
         state.profileId = 0;
         state.profileImage = '';
      }
   }
});

export const { getProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;