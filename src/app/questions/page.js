"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import { QuestionsApp } from "../applications/questionsApp";
import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";

export default function Questions() {
  return (
    <Grid container direction={"column"} gap={4}>
      <BreadcrumbsLayout titles={["سوالات متداول", "پشتیبانی"]} />
      <QuestionsApp />
    </Grid>
  );
}
