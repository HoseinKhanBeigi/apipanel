"use client";

import DashboardLayout from "../layouts/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import noresult from "../auth/noresult.png";
import { convertToJalaliDate, fDate } from "../utils";
import AccountMenu from "../components/menu";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import Box from "@mui/material/Box";
import { servicesList } from "../actions/CallsReports";
import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Image from "next/image";
import { formatToPersian } from "../utils/convertPersian";

export default function Service() {
  const dispatch = useDispatch();
  const { status, entities } = useSelector((state) => state.servicesListSlice);

  useEffect(() => {
    if (!entities.length) {
      dispatch(servicesList({})).then(() => {});
    }
  }, []);
  const headers = [
    {
      id: "apiName",
      label: "نام سرویس",
      align: "center",
    },
    {
      id: "enable",
      label: "وضعیت",
      align: "center",
    },
    {
      id: "startDate",
      label: "تاریخ شروع سررسید",
      align: "center",
    },
    {
      id: "endDate",
      label: "تاریخ پایان سررسید",
      align: "center",
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
    {
      id: "totalCallCount",
      label: "جزییات",
      align: "center",
    },
  ];
  return (
    <Providers>
      <ProtectedRoute>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // height: "80vh",
            justifyContent: "space-between",
            background: "#fff",
          }}
        >
          <Paper sx={{ width: "100%", overflow: "hidden", paddingBottom: 0 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 800 }}>
              <Table dir="rtl" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headers.map((e, i) => (
                      <TableCell
                        sx={{ backgroundColor: "#EFF3F3" }}
                        align="right"
                        key={i}
                      >
                        {e.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {status === "succeeded" &&
                    entities?.map((row, i) => {
                      return (
                        <TableRow key={i} role="checkbox">
                          <TableCell align="right">{row?.apiName}</TableCell>
                          <TableCell align="right" sx={{ color: "#017874" }}>
                            {row.enable ? "فعال" : "غیر فعال"}
                          </TableCell>

                          <TableCell align="right">
                            {formatToPersian(
                              convertToJalaliDate(fDate(row.startDate))
                            )}
                            {/* {TimeDate(row.requestDate)} */}
                          </TableCell>
                          <TableCell align="right">
                            {formatToPersian(
                              convertToJalaliDate(fDate(row.endDate))
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {formatToPersian(row.timeRateLimit)}
                          </TableCell>
                          <TableCell align="right">
                            {formatToPersian(row?.totalCallCount)}
                          </TableCell>
                          <TableCell align="right">
                            <AccountMenu id={row.id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Paper sx={{ display: "flex", justifyContent: "center" }}>
              {status === "succeeded" && entities?.length === 0 && (
                <Image
                  src={noresult}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              )}
              {status === "failed" && (
                <Image
                  src={noresult}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              )}
            </Paper>
          </Paper>
        </Box>
      </ProtectedRoute>
    </Providers>
  );
}
