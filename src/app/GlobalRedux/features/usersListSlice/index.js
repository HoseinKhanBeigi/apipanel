"use client";
import { createSlice } from "@reduxjs/toolkit";
import { usersList} from "../../../actions/CallsReports";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(usersList.pending, (state) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(usersList.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "succeeded";
          state.data = action.payload;
        }
      })
      .addCase(usersList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
