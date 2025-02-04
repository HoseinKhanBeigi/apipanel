"use client";
import { createSlice } from "@reduxjs/toolkit";
import {servicesMonthlyReport} from "../../../actions/CallsReports";

const initialState = {
  data:[],
  status: "idle",
  error: null,
};

export const servicesMonthlyLogSlice = createSlice({
  name: "servicesMonthlyLog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(servicesMonthlyReport.pending, (state) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(servicesMonthlyReport.fulfilled, (state, action) => {

        if (state.status === "pending") {
          state.status = "succeeded";
          state.data =action.payload.map((item) => {
            return{
              id: item.id,
              value:item.count,
              label:item.nameFarsi
            }
          })
        }

      })
      .addCase(servicesMonthlyReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
