"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import TicketApp from "../applications/TicketsApp";

export default function Tickets() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["لیست تیکت ها", "پشتیبانی"]} />
        <TicketApp />
      </Grid>
    </ProtectedRoute>
  );
}
