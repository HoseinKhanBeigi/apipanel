"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { BreadcrumbsLayout } from "../components/breadcrumbs";
import PaymentsApp from "../applications/paymentsApp";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";

export default function Payments() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["پرداخت ها", "مالی"]} />
        <PaymentsApp />
      </Grid>
    </ProtectedRoute>
  );
}
