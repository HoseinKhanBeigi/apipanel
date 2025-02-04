"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EnterToNeshan from "../EnterToNeshan/EnterToNeshan";

import Loading from "../Loading/Loading";

export const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const res = localStorage.getItem("token");
    if (!res) {
      router.push("/login");
    }
    setToken(res);
  }, []);

  if (!token) {
    return <Loading />;
  } else {
    return <>{children}</>;
  }
};
