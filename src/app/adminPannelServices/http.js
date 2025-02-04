"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { messageHandling } from "../GlobalRedux/features/messageLog";

const instance = axios.create({});

const AxiosInterceptor = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      if (error.response.data.status === 400) {
        // dispatch(messageHandling(error));
        dispatch(messageHandling(error));
      }
      if (error.response.status === 401) {
        localStorage.clear();
        router.push("/login");
        dispatch(messageHandling(error.response));
      } else if (error.response.status === 403) {
        localStorage.clear();
        router.push("/login");
        dispatch(messageHandling(error.response));
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
