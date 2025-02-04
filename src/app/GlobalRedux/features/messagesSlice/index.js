"use client";
import { createSlice } from "@reduxjs/toolkit";
import {messagesList} from "../../../actions/CallsReports";

const initialState = {
  messages:[],
  unRead:[],
  status: "idle",
  error: null,
};

export const messagesSlice = createSlice({
  name: "messagesList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(messagesList.pending, (state) => {
        state.status = "pending";
        state.messages = [];
      })
      .addCase(messagesList.fulfilled, (state, action) => {

        if (state.status === "pending") {
          state.status = "succeeded";
          state.messages = action.payload;
          state.unRead= action.payload.filter(item => !item.seenStatus)

        }

      })
      .addCase(messagesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
