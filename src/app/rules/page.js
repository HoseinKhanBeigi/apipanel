"use client";
import React from "react";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { RulesApp } from "../applications/rulesApp";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid } from "@mui/material";

export default function Rules() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["قوانین", "پشتیبانی"]} />
        <RulesApp />
      </Grid>
    </ProtectedRoute>
  );
}
