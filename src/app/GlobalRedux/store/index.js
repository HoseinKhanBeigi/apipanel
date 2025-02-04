import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { callsReportsSlice } from "../features/callsReportsSlice";
import { servicesListSlice } from "../features/servicesListSlice";
import messageLog from "../features/messageLog";
import { servicesWeeklyLogSlice } from "../features/servicesWeeklyLogSlice";
import { servicesMonthlyLogSlice } from "../features/servicesMonthlyLogSlice";
import { servicesHealthSlice } from "../features/servicesHealthSlice";
import { messagesSlice } from "../features/messagesSlice";
import { usersListSlice } from "../features/usersListSlice";
import getTokenSlice from "../features/getTokenSlice";

const rootReducer = combineReducers({
  callsReportsSlice,
  servicesListSlice,
  servicesWeeklyLogSlice,
  servicesMonthlyLogSlice,
  servicesHealthSlice,
  messagesSlice,
  messageLog,
  usersListSlice,
  getTokenSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
