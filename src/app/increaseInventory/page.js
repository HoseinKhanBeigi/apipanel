"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import IncreaseInventoryApp from "../applications/increaseInventoryApp";

export default function IncreaseInventory() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["افزایش موجودی", "مالی"]} />
        <IncreaseInventoryApp />
      </Grid>
    </ProtectedRoute>
  );
}
