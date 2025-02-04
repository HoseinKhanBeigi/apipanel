"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BreadcrumbsLayout } from "../components/breadcrumbs";

import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { KycIdentificationApp } from "../applications/kycIdentificationApp";
import { Grid } from "@mui/material";

export default function kycIdentification() {
  return (
    <Grid container direction={"column"} gap={4}>
      <BreadcrumbsLayout titles={["گزارش احراز هویت", "گزارشات"]} />
      <KycIdentificationApp />
    </Grid>
  );
}
