"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import DashboardLayout from "../layouts/dashboard";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import { UpdatesApp } from "../applications/updatesApp";

import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";

export default function Updates() {
  return (
    <Providers>
      <ProtectedRoute>
        <Grid container direction={"column"} gap={4}>
          <BreadcrumbsLayout titles={["گزارش احراز هویت", "گزارشات"]} />
          <UpdatesApp />
        </Grid>
      </ProtectedRoute>
    </Providers>
  );
}
