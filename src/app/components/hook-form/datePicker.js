import * as React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useTheme from "@mui/system/useTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CacheInput from "../../cacheInput";
import { addYears, endOfYear, isBefore, startOfYear } from "date-fns";
import TextField from "@mui/material/TextField";
import { formatToPersian } from "../../utils/convertPersian";

export const persianNumToEnglishNum = (s) =>
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const DateReformat = (date) =>
  date
    .split(",")[0]
    .split("/")
    .map((element, index) => {
      if (index > 0) {
        if (element.length < 2) {
          return `0${element}`;
        }
        return element;
      }

      return element;
    })
    .join("");

export class ExtendedAdapterDateFns extends AdapterDateFnsJalali {
  getYearRange = ([start, end]) => {
    const startDate = startOfYear(start);
    const endDate = endOfYear(end);
    const years = [];

    let currentYear = endDate;
    while (isBefore(startDate, currentYear)) {
      years.push(currentYear);
      currentYear = addYears(currentYear, -1);
    }
    return years;
  };
}

export default function DatePickerInput({
  label,
  onChange,
  error,
  defaultValue,
  isMaxMinDate,
}) {
  const existingTheme = useTheme();

  const theme = React.useMemo(
    () => createTheme({ direction: "rtl" }, existingTheme),
    [existingTheme]
  );

  return (
    <CacheInput>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <LocalizationProvider
            dateAdapter={ExtendedAdapterDateFns}
            dateFormats={{ monthShort: "MMMM", weekdayShort: "EE" }}
          >
            <DatePicker
              sx={{
                "& .MuiDayCalendar-weekDayLabel": { color: "red" },
              }}
              openTo="year"
              views={["year", "month", "day"]}
              slots={
                isMaxMinDate
                  ? ""
                  : {
                      textField: (params) => {
                        return (
                          <TextField
                            {...params}
                            value={formatToPersian(params.value)}
                          />
                        );
                      },
                    }
              }
              slotProps={
                isMaxMinDate
                  ? ""
                  : {
                      textField: {
                        error: error,
                        helperText: error,
                      },
                      layout: isMaxMinDate
                        ? ""
                        : {
                            sx: {
                              "& .MuiDayCalendar-header": {
                                flexDirection: "row-reverse !important",
                              },
                              "& .MuiDayCalendar-weekContainer": {
                                flexDirection: "row-reverse !important",
                              },
                              "& .MuiMonthCalendar-root ": {
                                flexDirection: "row-reverse !important",
                              },
                            },
                          },
                    }
              }
              adapterLocale={"fa-IR"}
              maxDate={isMaxMinDate ? "" : new Date()}
              minDate={
                isMaxMinDate
                  ? ""
                  : new Date(
                      new Date().setFullYear(new Date().getFullYear() - 24)
                    )
              }
              localeText={"fa-IR"}
              label={label}
              format="yyyy/MM/dd"
              onChange={(value) => onChange(value)}
              defaultValue={defaultValue || new Date()}
            />
          </LocalizationProvider>
        </div>
      </ThemeProvider>
    </CacheInput>
  );
}
