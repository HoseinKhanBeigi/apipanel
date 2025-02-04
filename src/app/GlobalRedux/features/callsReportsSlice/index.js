"use client";
import { createSlice } from "@reduxjs/toolkit";
import { callsReports } from "../../../actions/CallsReports";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const callsReportsSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(callsReports.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(callsReports.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "succeeded";
          state.entities = action.payload;
        }
      })
      .addCase(callsReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
