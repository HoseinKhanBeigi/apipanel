"use client";
// src/VideoRecorder.js
import React, { useState, useRef, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CacheInput from "../cacheInput";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import { Providers } from "../GlobalRedux/Provider/Provider";
import { ProtectedRoute } from "../components/ProtectionRoute/ProtectionRoute";
import DatePickerInput from "../components/hook-form/datePicker";
import DashboardLayout from "../layouts/dashboard";
import "./index.css";

// JSON.stringify({
//   client_id: "api-client-levant",
//   client_secret: "59c24382-18ac-41e5-9141-ef2dbcd2e8de",
//   grant_type: "client_credentials",
//   scope: "roles",
// });

// JSON.stringify({
//   client_id: "api-client-demo",
//   client_secret: "21ba7936-ea0c-45ce-996d-887712f79799",
//   grant_type: "client_credentials",
//   scope: "roles",
// });

const Kyc = () => {
  const baseUrl = "https://api.levants.io";
  const baseUrl2 = "https://uat.kian.digital/api-proxy";
  const router = useRouter();

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const env = pathname.split("/").pop();
  // console.log(env);

  const sendMessageToApp2 = async (kycId, token) => {
    try {
      const res = await fetch("https://kyc-gateway.levants.io/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kycId, token }), // Send the message from App1
      });

      return res;

      // const result = await res.json();
      // setResponse(result); // Store the response from App2
    } catch (error) {
      console.error("Error sending message to App2:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("env", env);
  }, []);

  const getToken = async (e) => {
    try {
      const response = await fetch(`${baseUrl}/v1/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "api-client-demo",
          client_secret: "21ba7936-ea0c-45ce-996d-887712f79799",
          grant_type: "client_credentials",
          scope: "roles",
        }),
      });

      // Check if the response is okay
      if (!response.ok) {
        alert("Network response was not ok");
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setToken(json.access_token);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const [filterInputs, setFilterInput] = React.useState({
    nationalCode: "",
    birthDate: "",
  });
  const [error, setError] = useState(false);
  const onChangeInput = (name) => (e) => {
    setFilterInput({ ...filterInputs, [name]: e.target.value });
    const inputValue = e.target.value;
    if (inputValue.length !== 10) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleNext = async () => {
    // const birthDate = getEpoch(
    //   filterInputs.birthYear,
    //   filterInputs.birthMonth,
    //   filterInputs.birthDay
    // );
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/v2/kyc/init/HEAD_POSITIONING/${filterInputs.nationalCode}/${filterInputs.birthDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        const json = await response.json();
        alert(json.detail);
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setLoading(false);

      // localStorage.setItem("kycId", json.kycId);
      sendMessageToApp2(json.kycId, token).then(() => {
        window.location.href = "https://kyc-gateway.levants.io/";
      });
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const onChangeBrithDate = (value) => {
    const date = new Date(value);
    const epochTime = date.getTime();
    setFilterInput({ ...filterInputs, ["birthDate"]: epochTime });
  };
  return (
    <Providers>
      <ProtectedRoute>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="main">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
                direction: "rtl",
              }}
            >
              <CacheInput>
                <TextField
                  id="outlined-basic"
                  onChange={onChangeInput("nationalCode")}
                  value={filterInputs.nationalCode}
                  label={"شماره ملي"}
                  variant="outlined"
                  type="number"
                  dir="rtl"
                  error={error && filterInputs.nationalCode.length > 0} // Only show red border if there is a filterInputs.nationalCode
                  helperText={
                    error && filterInputs.nationalCode
                      ? "شماره ملی ۱۰ رقم باید باشد"
                      : ""
                  }
                  FormHelperTextProps={{
                    style: {
                      visibility: filterInputs.nationalCode
                        ? "visible"
                        : "hidden",
                    }, // Hide helper text when input is empty
                  }}
                  inputProps={{ maxLength: 10 }}
                  // fullWidth
                />
              </CacheInput>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "12px",
                }}
              >
                <CacheInput>
                  <DatePickerInput
                    label={"تاریخ تولد"}
                    onChange={onChangeBrithDate}
                    // error={error}
                    isMaxMinDate
                  />
                </CacheInput>
              </div>

              <LoadingButton
                loading={loading}
                loadingIndicator="Loading…"
                variant="outlined"
                onClick={handleNext}
                disabled={filterInputs.nationalCode.length !== 10}
              >
                استعلام از ثبت احوال
              </LoadingButton>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Providers>
  );
};

export default Kyc;
