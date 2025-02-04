"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import InvoiceApp from "../applications/invoiceApp";

export default function Invoice() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["صورت حساب", "مالی"]} />
        <InvoiceApp />
      </Grid>
    </ProtectedRoute>
  );
}
