"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import { GuideApp } from "../applications/guideApp";
import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";

export default function Guide() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["راهنما", "پشتیبانی"]} />
        <GuideApp />
      </Grid>
    </ProtectedRoute>
  );
}
