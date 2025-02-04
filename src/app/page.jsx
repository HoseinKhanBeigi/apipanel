import { ProtectedRoute } from "./components/ProtectionRoute/ProtectionRoute";
import { BreadcrumbsLayout } from "./components/breadcrumbs";
import DashboardApp from "./applications/dashboard/DashboardApp";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["داشبورد"]} />

        <DashboardApp />
      </Grid>
    </ProtectedRoute>
  );
}
