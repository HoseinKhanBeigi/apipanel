"use client";
import { createSlice } from "@reduxjs/toolkit";
import {servicesHealthReport} from "../../../actions/CallsReports";


const initialState = {
  labels:[],
  HealthData:[],
  status: "idle",
  error: null,
};

export const servicesHealthSlice = createSlice({
  name: "servicesHealthLog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(servicesHealthReport.pending, (state) => {
        state.status = "pending";
      })
      .addCase(servicesHealthReport.fulfilled, (state, action) => {

        if (state.status === "pending") {
          state.status = "succeeded";
          const error=[]
          const success=[]
          const labels=[]
             action.payload.forEach((item)=>{
               labels?.push(item.nameFarsi)
            if (item.status==="ERROR"){
              error.push(item.percent)
            }
            else if (item.status==="SUCCESS"&&item.percent!==100){
              success.push(item.percent)
            }
            else {
              success.push(item.percent)
              error.push(100-item.percent)
            }
          })
          state.labels=labels.filter((item,index)=>labels.indexOf(item)===index)

          state.HealthData=[{
            data:success,stack:"A",label:"موفق"
          },{
          data:error,stack:"A",label:"ناموفق"
          }]
        }

      })
      .addCase(servicesHealthReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
