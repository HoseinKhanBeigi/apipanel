"use client";
import { useEffect, useMemo } from "react";
import DesktopLayout from "./desktopTest";
import MobileLayout from "./mobile";
import useResponsive from "../../hooks/useResponsive";

export default function MainLayout({ children }) {
  const isDesktop = useResponsive("up", "sm");

  // Memoize the layout to avoid unnecessary re-renders
  const Layout = useMemo(() => {
    return isDesktop ? DesktopLayout : MobileLayout;
  }, [isDesktop]);

  return <Layout>{children}</Layout>;
}
