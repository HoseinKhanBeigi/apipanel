import { createSlice } from "@reduxjs/toolkit";

const getTokenSlice = createSlice({
  name: "token",
  initialState: {
    tokenState: "",
  },
  reducers: {
    saveToken(state, action) {
      state.tokenState = action.payload;
    },
  },
});

export const { saveToken } = getTokenSlice.actions;
export default getTokenSlice.reducer;
