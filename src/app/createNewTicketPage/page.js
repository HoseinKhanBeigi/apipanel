"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { BreadcrumbsLayout } from "../components/breadcrumbs";
import CreateNewTicketApp from "../applications/createNewTicketApp";
import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import { Grid, Typography } from "@mui/material";

export default function Tickets() {
  return (
    <ProtectedRoute>
      <Grid container direction={"column"} gap={4}>
        <BreadcrumbsLayout titles={["ثبت تیکت جدید", "پشتیبانی"]} />
        <CreateNewTicketApp />
      </Grid>
    </ProtectedRoute>
  );
}
