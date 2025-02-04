"use client";

import DashboardLayout from "../layouts/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import noresult from "../auth/noresult.png";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import Box from "@mui/material/Box";
import { usersList } from "../actions/CallsReports";
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

export default function Users() {
  const dispatch = useDispatch();
  const { status, data } = useSelector((state) => state.usersListSlice);

  useEffect(() => {
    if (!data.length) {
      dispatch(usersList({})).then(() => {});
    }
  }, []);

  const headers = [
    {
      id: "firstName",
      label: "نام",
      align: "center",
    },
    {
      id: "lastName",
      label: "نام خانوادگی",
      align: "center",
    },
    {
      id: "nationalCode",
      label: "کد ملی",
      align: "center",
    },
    {
      id: "mobilePhone",
      label: "موبایل",
      align: "center",
    },
    {
      id: "email",
      label: "ایمیل",
      align: "center",
    },
    {
      id: "status",
      label: "وضعیت",
      align: "center",
    },
  ];
  const statusTypes = {
    ACTIVE: "فعال",
    INACTIVE: "غیر فعال",
    SUSPENDED: "معلق شده",
    DELETED: "حذف شده",
  };

  return (
    <Providers>
      <ProtectedRoute>
        <DashboardLayout>
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
                      data?.map((row, i) => {
                        console.log(row);
                        return (
                          <TableRow key={i} role="checkbox">
                            <TableCell align="right">
                              {row?.firstName}
                            </TableCell>
                            <TableCell align="right">{row?.lastName}</TableCell>
                            {/*<TableCell align="right">*/}
                            {/*  {formatToPersian(convertToJalaliDate(fDate(row.startDate)))}*/}
                            {/*  /!* {TimeDate(row.requestDate)} *!/*/}
                            {/*</TableCell>*/}
                            {/*<TableCell align="right">*/}
                            {/*  {formatToPersian(convertToJalaliDate(fDate(row.endDate)))}*/}
                            {/*</TableCell>*/}
                            <TableCell align="right">
                              {formatToPersian(row?.nationalCode)}
                            </TableCell>
                            <TableCell align="right">
                              {formatToPersian(row?.mobilePhone)}
                            </TableCell>
                            <TableCell align="right">{row?.email}</TableCell>
                            <TableCell align="right">
                              {statusTypes[row?.status]}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                {status === "succeeded" && data?.length === 0 && (
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
        </DashboardLayout>
      </ProtectedRoute>
    </Providers>
  );
}
