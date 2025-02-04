"use client";
import { createSlice } from "@reduxjs/toolkit";
import { servicesList } from "../../../actions/CallsReports";

const initialState = {
  entities: [],
  data: [],
  status: "idle",
  error: null,
};

export const servicesListSlice = createSlice({
  name: "servicesList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(servicesList.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(servicesList.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "succeeded";
          state.entities = action.payload;
          state.data = state.entities.map((e) => {
            return { label: e.apiName, value: e.id, ...e };
          });
        }
      })
      .addCase(servicesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
