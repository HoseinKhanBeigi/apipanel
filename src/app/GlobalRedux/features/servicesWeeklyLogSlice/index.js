"use client";
import { createSlice } from "@reduxjs/toolkit";
import {servicesWeeklyReport} from "../../../actions/CallsReports";
import convertToJalaliDate from "../../../utils/date";
import {formatToPersian} from "../../../utils/convertPersian";

const initialState = {
  dataset: [],
  series: [],
  status: "idle",
  error: null,
};

export const servicesWeeklyLogSlice = createSlice({
  name: "servicesWeeklyLog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(servicesWeeklyReport.pending, (state) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(servicesWeeklyReport.fulfilled, (state, action) => {

        if (state.status === "pending") {
          state.status = "succeeded";
          state.series =action.payload.map((item)=>{
            return{
              dataKey: item.nameFarsi,
              label: item.nameFarsi,
            }
          }).reduce((unique, o) => {
            if(!unique.some(obj => obj.label === o.label && obj.dataKey === o.dataKey)) {
              unique.push(o);
            }
            return unique;
          },[]);
              let array=[]
          for (let i=0; i<7; i++){
            const date = new Date(new Date().setDate(new Date().getDate() - 7+i)).toISOString().split("T")[0];
            const data =action.payload.filter((item) => item.date === date)
            const x=data.map((item) => {
              return {[item.nameFarsi]: item.count}
            }).reduce(((r, c) => Object.assign(r, c)), {})
            array=[...array,{date:formatToPersian(convertToJalaliDate(date)),...x}]
          }
          state.dataset =array
        }

      })
      .addCase(servicesWeeklyReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
