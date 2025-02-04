import { BreadcrumbsLayout } from "../components/breadcrumbs";
import DashboardLayout from "../layouts/dashboard";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import ReportsApp from "../components/reportsApp";
import { Grid } from "@mui/material";

export default function Reports() {
  return (
    <Providers>
      <ProtectedRoute>
        <Grid container direction={"column"} gap={4}>
          <BreadcrumbsLayout titles={["گذارش فراخوانی", "گزارشات"]} />
          <ReportsApp />
        </Grid>
      </ProtectedRoute>
    </Providers>
  );
}
