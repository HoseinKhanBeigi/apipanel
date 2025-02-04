import convertToJalaliDate from "../../utils/date";
import { fDate } from "../../utils/formatTime";

export const columns = [
  {
    id: "apiName",
    label: "نام سرویس",
    align: "center",
  },
  {
    id: "enable",
    label: "وضعیت",
    align: "center",
    format: (value) => (value ? "فعال" : "غیرفعال"),
  },
  {
    id: "endDate",
    label: "تاریخ سررسید",
    align: "center",
    format: (value) => convertToJalaliDate(fDate(value)),
  },
  {
    id: "timeRateLimit",
    label: "مقدار فراخوانی مجاز",
    align: "center",
  },
  {
    id: "totalCallCount",
    label: "کل فراخوانی مصرف شده",
    align: "center",
  },
];
