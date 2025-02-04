import React, { useEffect, useMemo, useRef, useState } from "react";
import AutocompleteInput from "../hook-form/autoComplete";
import { useDispatch } from "react-redux";
import { callsReports } from "../../actions/CallsReports";
import { getQueryParams } from "../../utils";
import { formatToPersian } from "../../utils/convertPersian";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

import DatePickerInput, {
  DateReformat,
  persianNumToEnglishNum,
} from "../hook-form/datePicker";

const today = (date) => {
  return DateReformat(
    persianNumToEnglishNum(new Date(date).toLocaleString("fa-IR"))
  );
};

export default function Filter() {
  const handleChangeForCallStatus = () => {};

  const dispatch = useDispatch();
  const router = useRouter();
  const [maxDate, setMaxDate] = useState("");
  const [firstDate, setFirstDate] = useState(
    getQueryParams().startDate
      ? new Date(getQueryParams().startDate)
      : new Date()
  );
  const [lastDate, setLastDate] = useState(
    getQueryParams().endDate ? new Date(getQueryParams().endDate) : new Date()
  );

  const pageCount = useRef({
    size: 10,
    limit: 10,
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);
  const handleFilter = () => {
    const newvalue = {
      requestDateFrom: today(firstDate),
      requestDateTo: today(lastDate),
    };
    dispatch(
      callsReports({
        body: { ...newvalue },
        params: {
          page: 1,
          limit: pageCount.current.limit,
          size: pageCount.current.limit,
        },
      })
    );

    const params = {
      ...getQueryParams(),
      page: 0,
      ...newvalue,
    };
    const queryString = new URLSearchParams(params).toString();
    router.replace(`/reports?${queryString}`);
    setError("");
  };
  const onChangeDatePickerTo = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 31);
    setLastDate(date);
  };
  const onChangeDatePickerFrom = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 31);
    setMaxDate(newDate);
    setFirstDate(date);
  };

  const handleCancel = () => {};
  return (
    <Grid
      container
      mb={2}
      mt={2}
      height={"130px"}
      sx={{ border: "1px solid", borderColor: "silver", borderRadius: "12px" }}
    >
      <Grid item container>
        <Grid
          container
          item
          xs={3}
          flexDirection={"row-reverse"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Typography>{" : نام سرویس"}</Typography>

          <Grid item sx={{ width: "180px" }}>
            <AutocompleteInput
              name={"desc"}
              title={"نام سرویس"}
              multiple
              // inputValue={filterInputs.desc || []}
              data={[]}
              onChange={handleChangeForCallStatus}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={3}
          justifyContent={"space-around"}
          flexDirection={"row-reverse"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography>{" : نام مشتری"}</Typography>
          </Grid>
          <Grid item sx={{ width: "180px" }}>
            <AutocompleteInput
              name={"desc"}
              title={"نام مشتری"}
              multiple
              // inputValue={filterInputs.desc || []}
              data={[]}
              onChange={handleChangeForCallStatus}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={3}
          justifyContent={"space-around"}
          flexDirection={"row-reverse"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography>{" : از تاریخ"}</Typography>
          </Grid>

          <Grid item sx={{ width: "180px" }}>
            <DatePickerInput
              value={firstDate}
              isMaxMinDate
              label={"از تاریخ"}
              onChange={onChangeDatePickerFrom}
              defaultValue={firstDate}
              error={error}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={3}
          justifyContent={"space-around"}
          flexDirection={"row-reverse"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography>{" : تا تاریخ"}</Typography>
          </Grid>

          <Grid item sx={{ width: "180px" }}>
            <DatePickerInput
              value={lastDate}
              isMaxMinDate
              label={"تا تاریخ"}
              onChange={onChangeDatePickerTo}
              defaultValue={lastDate}
              error={error}
            />
          </Grid>
        </Grid>

        <Grid item container justifyContent={"flex-end"}>
          <Grid
            container
            item
            xs={3}
            justifyContent={"end"}
            flexDirection={"row-reverse"}
            alignItems={"center"}
            paddingRight={1}
            gap={1}
          >
            <Grid item>
              <Button fullWidth variant="outlined" onClick={handleFilter}>
                فیلتر
              </Button>
            </Grid>
            <Grid item>
              <Button fullWidth variant="outlined" onClick={handleCancel}>
                انصراف
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item container></Grid> */}
    </Grid>
  );
}
