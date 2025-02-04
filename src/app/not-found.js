import DashboardLayout from "./layouts/dashboard";
import { Providers } from "./GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "./components/ProtectionRoute/ProtectionRoute";
import Box from "@mui/material/Box";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import png from "./Public/images/404.png";
export default function NotFound() {
  return (
    <Providers>
      <ProtectedRoute>
        <DashboardLayout>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#fff",
            }}
          >
            <Paper sx={{ width: "100%", textAlign: "center" }}>
              <Image
                src={png}
                width={800}
                height={800}
                alt="Picture of the author"
              />
            </Paper>
          </Box>
        </DashboardLayout>
      </ProtectedRoute>
    </Providers>
  );
}
