"use client";
import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import DocumentsApp from "../components/documentsApp";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid } from "@mui/material";

export default function Documents() {
  return (
    <Providers>
      <ProtectedRoute>
        <Grid container direction={"column"} gap={4}>
          <BreadcrumbsLayout titles={["مستندات", "پیاده سازی"]} />
          <DocumentsApp />
        </Grid>
      </ProtectedRoute>
    </Providers>
  );
}
