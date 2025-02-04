"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { TableComponent } from "../tableComponent";
import { SortingTable } from "../sortingTable";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Notifier from "../notify";
import { fDate, TimeDate } from "../../utils/formatTime";
import convertToJalaliDate from "../../utils/date";
import { ServicesResponses } from "../services/servicesResponse";
import noresult from "../../auth/noresult.png";
import { callsReports, servicesList } from "../../actions/CallsReports";
import Box from "@mui/material/Box";

import { PaginationTable } from "../paginationComponent";
import DatePickerInput, {
  DateReformat,
  persianNumToEnglishNum,
} from "../hook-form/datePicker";
import { getQueryParams } from "../../utils";
import { formatToPersian } from "../../utils/convertPersian";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CacheInput from "../../cacheInput";
import TextField from "@mui/material/TextField";
import AutocompleteInput from "../hook-form/autoComplete";
import Button from "@mui/material/Button";
import { padding } from "@mui/system";

const today = (date) => {
  return DateReformat(
    persianNumToEnglishNum(new Date(date).toLocaleString("fa-IR"))
  );
};

export default function ReportsApp() {
  const dispatch = useDispatch();
  const [maxDate, setMaxDate] = useState("");
  const [firstDate, setFirstDate] = useState(
    getQueryParams().startDate
      ? new Date(getQueryParams().startDate)
      : new Date()
  );
  const [lastDate, setLastDate] = useState(
    getQueryParams().endDate ? new Date(getQueryParams().endDate) : new Date()
  );
  const [error, setError] = useState(null);
  const [filterInputs, setFilterInput] = React.useState({
    apiId: null,
    desc: [],
    traceId: "",
    responseHttpStatus: "",
    requestDateFrom: "",
    requestDateTo: "",
  });
  const { status, data } = useSelector((state) => state.servicesListSlice);

  const callsReportsResponse = useSelector((state) => state.callsReportsSlice);
  const router = useRouter();

  const pageRef = useRef({
    apiId: parseInt(getQueryParams().id) || "",
    desc: [],
    requestDateFrom: getQueryParams().startDate
      ? today(getQueryParams().startDate)
      : today(new Date()),
    requestDateTo: getQueryParams().endDate
      ? today(getQueryParams().endDate)
      : today(new Date()),
    traceId: "",
    responseHttpStatus: "",
  });

  const pageCount = useRef({
    size: 10,
    limit: 10,
    startDate: "",
    endDate: "",
  });

  const headers = [
    { id: "apiName", label: "نام سرویس", align: "center" },
    {
      id: "requestDate",
      label: "تاریخ فراخوانی",
      align: "center",
    },
    {
      id: "requestDate",
      label: "زمان فراخوانی",
      align: "center",
    },
    { id: "responseHttpStatus", label: " کد پاسخ", align: "center" },
    {
      id: "desc",
      label: "وضعیت فراخوانی",
      align: "center",
    },
    { id: "traceId", label: "کد رهگیری", align: "center" },
  ];
  React.useEffect(() => {
    const value = data.find((e) => e.id === parseInt(getQueryParams().id));
    setFilterInput({ ...filterInputs, apiId: value });
  }, [data]);

  useEffect(() => {
    if (!data.length) {
      dispatch(servicesList({}));
    }
    const params = {
      page: 0,
      size: pageCount.current.limit,
      limit: pageCount.current.limit,
      ...getQueryParams(),
    };
    let res = "";
    for (var key in pageRef.current) {
      if (pageRef.current[key] === "") {
        delete pageRef.current[key];
      } else {
        res = pageRef.current;
      }
    }
    dispatch(
      callsReports({
        params: {
          page: 1,
          size: pageCount.current.limit,
          limit: pageCount.current.limit,
          ...getQueryParams(),
        },
        body: { ...res },
      })
    );
    const queryString = new URLSearchParams(params).toString();
    router.replace(`/reports?${queryString}`);
  }, []);

  const handleChange = (newPage) => {
    console.log(getQueryParams());
    const newvalue = {
      ...filterInputs,
      requestDateFrom: today(firstDate),
      requestDateTo: today(lastDate),
      apiId: filterInputs?.apiId?.id,
      desc: filterInputs?.desc?.map((e) => e.value),
    };
    let res = "";

    for (var key in newvalue) {
      if (newvalue[key] === "") {
        delete newvalue[key];
      } else {
        res = newvalue;
      }
    }
    dispatch(
      callsReports({
        body: { ...res },
        params: {
          page: newPage - 1,
          limit: pageCount.current.limit,
          size: pageCount.current.limit,
        },
      })
    );
  };

  const countPerPage = (val) => {
    pageCount.current.limit = val;
    pageCount.current.size = val;
    const newvalue = {
      ...filterInputs,
      requestDateFrom: today(firstDate),
      requestDateTo: today(lastDate),
      apiId: filterInputs?.apiId?.id,
      desc: filterInputs?.desc?.map((e) => e.value),
    };
    let res = "";

    for (var key in newvalue) {
      if (newvalue[key] === "") {
        delete newvalue[key];
      } else {
        res = newvalue;
      }
    }

    dispatch(
      callsReports({
        body: { ...res },
        params: {
          ...getQueryParams(),
          page: 0,
          limit: pageCount.current.limit,
          size: pageCount.current.limit,
        },
      })
    );

    const params = {
      ...getQueryParams(),
      limit: pageCount.current.limit,
      size: pageCount.current.limit,
    };
    const queryString = new URLSearchParams(params).toString();
    router.replace(`?${queryString}`);
  };
  const notifyMemo = useMemo(() => {
    return <Notifier />;
  }, []);

  const onChangeTraceId = (e) => {
    setFilterInput({ ...filterInputs, traceId: e.target.value });
  };
  const handleChangeForCallStatus = (ev, value) => {
    setFilterInput({ ...filterInputs, desc: value });
  };
  const handleChangeForNameService = (ev, value) => {
    setFilterInput({ ...filterInputs, apiId: value });
  };

  const onChangeCode = (e) => {
    setFilterInput({ ...filterInputs, responseHttpStatus: e.target.value });
  };

  const onChangeDatePickerFrom = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 31);
    setMaxDate(newDate);
    setFirstDate(date);
  };

  const handleFilter = () => {
    if (new Date(lastDate) > new Date(maxDate)) {
      setError("حداکثر بازه زمانی باید ۳۱ روز باشد");
    } else {
      const newvalue = {
        ...filterInputs,
        requestDateFrom: today(firstDate),
        requestDateTo: today(lastDate),
        apiId: filterInputs?.apiId?.id,
        desc: filterInputs?.desc?.map((e) => e.value),
      };
      let res = "";

      for (var key in newvalue) {
        if (newvalue[key] === "") {
          delete newvalue[key];
        } else {
          res = newvalue;
        }
      }

      const { startDate, endDate, id, ...rest } = getQueryParams();
      dispatch(
        callsReports({
          body: { ...res },
          params: { ...rest, page: 0 },
        })
      );

      const params = {
        ...getQueryParams(),
        page: 0,
      };
      const queryString = new URLSearchParams(params).toString();
      router.replace(`/reports?${queryString}`);
      setError("");
    }
  };

  const handleCancel = () => {
    setFilterInput({
      responseHttpStatus: "",
      desc: [],
      apiId: null,
      traceId: "",
      requestDateFrom: filterInputs.requestDateFrom,
      requestDateTo: filterInputs.requestDateTo,
    });
  };

  const onChangeDatePickerTo = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 31);
    setLastDate(date);
  };

  const dateFieldsRender = useMemo(
    () => (
      <>
        {" "}
        <ListItem>
          <DatePickerInput
            value={firstDate}
            label={"از تاریخ"}
            onChange={onChangeDatePickerFrom}
            defaultValue={firstDate}
            error={error}
          />
        </ListItem>
        <ListItem>
          <DatePickerInput
            value={lastDate}
            label={"تا تاریخ"}
            onChange={onChangeDatePickerTo}
            maxDate={maxDate}
            defaultValue={lastDate}
            error={error}
          />
        </ListItem>
      </>
    ),
    [error]
  );

  return (
    <>
      <Box sx={{ overflowX: "scroll", width: "100%" }}>
        <TableComponent>
          <TableHead>
            <TableRow>
              {headers?.map((e, i) => (
                <TableCell
                  sx={{ backgroundColor: "#EFF3F3" }}
                  align="center"
                  key={i}
                >
                  {e?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {status === "succeeded" &&
              callsReportsResponse?.entities?.content?.map((row, i) => {
                return (
                  <TableRow key={i} role="checkbox">
                    <TableCell align="center">{row?.apiName}</TableCell>
                    <TableCell align="center" sx={{ color: "#017874" }}>
                      {formatToPersian(
                        convertToJalaliDate(fDate(row?.requestDate))
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {formatToPersian(TimeDate(row?.requestDate))}
                    </TableCell>
                    <TableCell align="center">
                      {formatToPersian(row?.responseHttpStatus)}
                    </TableCell>
                    <TableCell align="center">
                      {
                        ServicesResponses?.find((e) => e.value === row.desc)
                          ?.label
                      }
                    </TableCell>
                    <TableCell align="center">
                      {row?.traceId ? formatToPersian(`${row?.traceId}`) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </TableComponent>

        {status === "succeeded" &&
          (callsReportsResponse.entities.totalElements === 0 ||
            callsReportsResponse.entities.content?.length === 0) && (
            <Image
              src={noresult}
              width={300}
              height={300}
              alt="Picture of the author"
              style={{ margin: "auto" }}
            />
          )}
        {callsReportsResponse.entities.totalElements !== 0 && (
          <PaginationTable
            status={callsReportsResponse.status}
            entities={callsReportsResponse.entities}
            action={""}
            onChange={handleChange}
            countPerPage={countPerPage}
          />
        )}
      </Box>
      {notifyMemo}
    </>
  );
}
