import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logState: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logPerson: (state, action) => {
      state.logState = action.payload;
    },
  },
});

export const { logPerson } = authSlice.actions;

export default authSlice.reducer;
