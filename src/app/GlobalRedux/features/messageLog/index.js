import { createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [], uploadMessage: [] };

const messageLog = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clearMessage(state) {
      state.messages = [];
      state.uploadMessage = [];
    },
    messageHandling(state, action) {
      if (action.payload?.response.data.status === 400) {
        state.messages.push({
          mess: action.payload?.response.data.detail,
          variant: "error",
        });
      } else if (action.payload?.status === 500) {
        state.messages.push({
          mess: "خطا از زیر ساخت",
          variant: "error",
        });
      } else if (action.payload?.status === 401) {
        state.messages.push({
          mess: "مجددا احراز هویت کنید",
          variant: "error",
        });
      } else if (action.payload?.status === 403) {
        state.messages.push({
          mess: "دسترسی شما مجاز نمی باشد",
          variant: "error",
        });
      } else {
        state.messages.push({
          mess: "خطا از زیر ساخت",
          variant: "error",
        });
      }
    },

    dragAndDropMess(state, action) {
      state.messages.push({
        mess: "فرمت فایل باید {xls or xlsx} باشد",
        variant: "error",
      });
    },

    responseMessage(state, action) {
      state.messages.push({
        mess: action.payload,
        variant: "success",
      });
    },
  },
});

export const {
  messageHandling,
  clearMessage,
  dragAndDropMess,
  responseMessage,
} = messageLog.actions;
export default messageLog.reducer;
