import DashboardLayout from "../layouts/dashboard";
import DashboardApp from "../applications/dashboard/DashboardApp";
import { BreadcrumbsLayout } from "../components/breadcrumbs";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["داشبورد"]} />
        <DashboardApp />
      </Grid>
    </ProtectedRoute>
  );
}
