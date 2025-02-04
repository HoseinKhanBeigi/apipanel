import * as React from "react";
import dayjs from "dayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TextField from "@mui/material/TextField";

import {
  LocalizationProvider,
  DatePicker,
  DateCalendar,
} from "@mui/x-date-pickers";

export default function DateTimePickerOpenTo() {
  const customLocale = {
    months: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
  };
  const dat = new Date("2022-04-03");
  const [value, setValue] = React.useState(dayjs("2022-04-03"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        dayOfWeekFormatter={(wee) => `${wee.format("ddd")}`}
        monthsPerRow={3}
      />
    </LocalizationProvider>
  );
}
