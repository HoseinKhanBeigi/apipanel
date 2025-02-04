"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  servicesHealthReport,
  servicesMonthlyReport,
  servicesWeeklyReport,
} from "../../actions/CallsReports";
import { axisClasses } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Grid, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { formatToPersian } from "../../utils/convertPersian";
import Image from "next/image";
import noresult from "../../auth/noresult.png";

export default function DashboardApp() {
  const dispatch = useDispatch();
  const { dataset, series } = useSelector(
    (state) => state.servicesWeeklyLogSlice
  );
  const { HealthData, labels } = useSelector(
    (state) => state.servicesHealthSlice
  );

  useEffect(() => {
    // console.log(window.location.origin);
  }, []);

  const { data } = useSelector((state) => state.servicesMonthlyLogSlice);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(
      servicesWeeklyReport({
        params: {},
        body: {},
      })
    );
    dispatch(
      servicesHealthReport({
        params: {},
        body: {},
      })
    );
    dispatch(
      servicesMonthlyReport({
        params: {},
        body: {},
      })
    );
  }, []);

  const chartSetting = {
    width: 900,
    height: 450,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-40px, 0)",
      },
    },
  };

  return (
    <Grid container>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          direction: "ltr",
          height: "100%",
        }}
      >
        {/* <Typography textAlign={"right"}>{"داشبورد"}</Typography> */}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ direction: "rtl" }}
            >
              <Tab label="گزارش هفتگی" value="1" />
              <Tab label="گزارش ۳۰ روزه اخیر" value="2" />
              <Tab label="گزارش پایداری" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "ltr",
              }}
            >
              {series.length ? (
                <BarChart
                  dataset={dataset}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "date",
                    },
                  ]}
                  yAxis={[
                    {
                      valueFormatter: (value) => `${formatToPersian(value)}`,
                      label: "تعداد فراخوانی در روز",
                    },
                  ]}
                  series={series.map((series) => ({
                    ...series,
                    valueFormatter: (v) => {
                      return `${formatToPersian(v)}`;
                    },
                  }))}
                  margin={{ top: 20, bottom: 150, left: 100, right: 100 }}
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "center" },
                      padding: 0,
                      itemGap: 20,
                      labels: {
                        boxWidth: 1000,
                        padding: 15,
                      },
                    },
                  }}
                  colors={[
                    "#B5D6B2",
                    "#EC9192",
                    "#DB5375",
                    "#BBBE64",
                    "#22AAA1",
                    "#AF9BE9",
                    "#2469AC",
                  ]}
                  {...chartSetting}
                />
              ) : (
                <Image
                  src={noresult}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  style={{ margin: "auto" }}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PieChart
                series={[
                  {
                    data,
                    valueFormatter: (v) => {
                      return `${formatToPersian(v.value)}`;
                    },
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    cy: 30,
                  },
                ]}
                colors={[
                  "#B5D6B2",
                  "#EC9192",
                  "#DB5375",
                  "#BBBE64",
                  "#22AAA1",
                  "#AF9BE9",
                  "#2469AC",
                ]}
                margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "center" },
                    padding: 0,
                    itemGap: 20,
                    labels: {
                      usePointStyle: true,
                      boxWidth: 1000,
                      padding: 15,
                    },
                  },
                }}
                {...chartSetting}
              />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "ltr",
              }}
            >
              {HealthData.data ? (
                <BarChart
                  width={600}
                  height={300}
                  margin={{ top: 20, bottom: 150, left: 100, right: 100 }}
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "center" },
                      padding: 0,
                      itemGap: 20,
                      labels: {
                        boxWidth: 1000,
                        padding: 15,
                      },
                    },
                  }}
                  colors={["#B5D6B2", "#DB5375"]}
                  {...chartSetting}
                  xAxis={[
                    {
                      scaleType: "band",
                      data: labels,
                      categoryGapRatio: 0.3,
                      barGapRatio: 0.1,
                    },
                  ]}
                  yAxis={[
                    {
                      valueFormatter: (value) => `${formatToPersian(value)}%`,
                      label: "درصد پایداری",
                    },
                  ]}
                  series={HealthData.map((series) => ({
                    ...series,
                    valueFormatter: (v) => {
                      return `${formatToPersian(v)}`;
                    },
                  }))}
                />
              ) : (
                <Image
                  src={noresult}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  style={{ margin: "auto" }}
                />
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
}
