"use client"; // ✅ Correct directive

import { Providers } from "./GlobalRedux/Provider/Provider";
import { CacheProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { SnackbarProvider, useSnackbar } from "notistack";
import DashboardLayout from "./layouts/dashboard";
import { AxiosInterceptor } from "./adminPannelServices/http";
import "./globals.css";

import createCache from "@emotion/cache";
import { usePathname } from "next/navigation";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({ children }) {
  const path = usePathname();
  return (
    <html lang="en">
      <body
        style={{
          overflowX: "hidden",
          overflowY: "hidden !important",
        }}
      >
        <Providers>
          <SnackbarProvider maxSnack={6} autoHideDuration={3000}>
            <AxiosInterceptor>
              {path === "/login" ? (
                children
              ) : (
                <DashboardLayout> {children}</DashboardLayout>
              )}
            </AxiosInterceptor>
          </SnackbarProvider>
        </Providers>
      </body>
    </html>
  );
}
