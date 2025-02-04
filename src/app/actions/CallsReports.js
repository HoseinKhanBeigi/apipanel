import { createAsyncAction } from "../adminPannelServices/requestHandler";

export const callsReports = createAsyncAction(
  `/request/list`,
  "callsReports",
  "post"
);

export const servicesWeeklyReport = createAsyncAction(
  `/bar/week`,
  "servicesWeeklyReport",
  "post"
);

export const servicesHealthReport = createAsyncAction(
  `/stack/status/30`,
  "servicesHealthReport",
  "get"
);

export const usersList = createAsyncAction(
  `/user/list`,
  "usersList",
  "get",
  "",
  "file"
);

export const servicesMonthlyReport = createAsyncAction(
  `/pie/month`,
  "servicesMonthlyReport",
  "post"
);

export const servicesList = createAsyncAction(
  `/purchase/list`,
  "servicesList",
  "get"
);

export const downLoadFile = createAsyncAction(
  `/file/manual/download`,
  "downloadFile",
  "get",
  "",
  "file",
  "file"
);

export const messagesList = createAsyncAction(
  `/message/list`,
  "messagesList",
  "get",
  "",
  "file"
);

export const readMessages = createAsyncAction(
  `/message/seen`,
  "messagesSeen",
  "put",
  "",
  "file"
);
