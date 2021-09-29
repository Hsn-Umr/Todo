import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
};
// saving user state for auto login session management
const userSclice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const {loginSuccess, logoutSuccess} = userSclice.actions;
export default userSclice.reducer;
