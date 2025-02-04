"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getToken } from "../actions/getTokenTest";
import { useEffect } from "react";
import { AxiosInterceptor } from "../adminPannelServices/http";
import { useDispatch, useSelector } from "react-redux";
import { servicesList } from "../actions/CallsReports";
import { saveToken } from "../GlobalRedux/features/getTokenSlice";

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const dispatch = useDispatch();
  const { tokenState } = useSelector((state) => state.getTokenSlice);

  useEffect(() => {
    getToken(code)
      .then((res) => {
        dispatch(saveToken(res.data.access_token));
        dispatch(servicesList({}));
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>loading...</div>;
}
