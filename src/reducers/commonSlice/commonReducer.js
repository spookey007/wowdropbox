import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleLoginModal: (state, { payload }) => {
      state.showLogin = payload;
    },
  },
});

export const { toggleLoginModal } = commonSlice.actions;

export default commonSlice.reducer;
