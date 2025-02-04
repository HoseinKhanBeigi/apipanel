"use client";
// src/VideoRecorder.js
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CacheInput from "../cacheInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import "./index.css";
import getEpoch from "./epoch";

const Kyc = () => {
  const baseUrl = "https://api.levants.io";
  const baseUrl2 = "https://uat.kian.digital/api-proxy";
  const router = useRouter();

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const env = pathname.split("/").pop();
  // console.log(env);

  useEffect(() => {
    localStorage.setItem("env", env);
  }, []);
  //  const router = useRouter();
  // const { uat } = router.query;
  // const uat = searchParams; // Access the 'uat' query parameter

  const sendMessageToApp2 = async (kycId, token) => {
    try {
      const res = await fetch("https://kycgateway.mt.levants.io/api/submit", {
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

  const getToken = async (e) => {
    try {
      const response = await fetch(`${baseUrl2}/v1/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "api-client-levant",
          client_secret: "59c24382-18ac-41e5-9141-ef2dbcd2e8de",
          grant_type: "client_credentials",
          scope: "roles",
        }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json);
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
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const [objectDetection, setObjectDetection] = useState("HEAD_POSITIONING");

  const onChangeInput = (name) => (e) => {
    setFilterInput({ ...filterInputs, [name]: e.target.value });
  };

  const handleNext = async () => {
    const birthDate = getEpoch(
      filterInputs.birthYear,
      filterInputs.birthMonth,
      filterInputs.birthDay
    );
    try {
      const response = await fetch(
        `${baseUrl2}/v2/kyc/init/${objectDetection}/${filterInputs.nationalCode}/${birthDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //4ee57e12-81d5-45d8-96ca-34765a7db964
      // 4ee57e12-81d5-45d8-96ca-34765a7db964
      // Check if the response is okay
      if (!response.ok) {
        const json = await response.json();
        alert(json.detail);
        return json;
      }
      const json = await response.json();

      localStorage.setItem("kycId", json.kycId);
      // http://localhost:3000/
      // https://kycgateway.mt.levants.io/

      sendMessageToApp2(json.kycId, token).then(() => {
        window.location.href = "https://kycgateway.mt.levants.io/";
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
      // theButton.classList.remove("buttonLoading");
      // theButton.classList.remove("disabled");
    }
  };
  const handleChange = (event) => {
    setObjectDetection(event.target.value);
  };
  const pathRef = useRef(null);

  return (
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
              <TextField
                id="outlined-basic"
                onChange={onChangeInput("birthDay")}
                value={filterInputs.birthDay}
                label={"روز تولد"}
                variant="outlined"
                required={true}
                type="number"
                // onChange={onChangeCode}
                dir="rtl"
              />
            </CacheInput>
            <CacheInput>
              <TextField
                id="outlined-basic"
                type="number"
                onChange={onChangeInput("birthMonth")}
                value={filterInputs.birthMonth}
                label={"ماه تولد"}
                required={true}
                variant="outlined"
                dir="rtl"
              />
            </CacheInput>
            <CacheInput>
              <TextField
                id="outlined-basic"
                onChange={onChangeInput("birthYear")}
                value={filterInputs.birthYear}
                type="number"
                label={"سال تولد"}
                InputProps={{ inputProps: { max: 4 } }}
                required={true}
                variant="outlined"
                dir="rtl"
              />
            </CacheInput>
          </div>

          <div>
            <CacheInput>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  type detection
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={objectDetection}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="HAND_GESTURE"
                    control={<Radio />}
                    label="HAND_GESTURE"
                  />
                  <FormControlLabel
                    value="HEAD_POSITIONING"
                    control={<Radio />}
                    label="HEAD_POSITIONING"
                  />
                </RadioGroup>
              </FormControl>
            </CacheInput>
          </div>

          <button
            class="button"
            onClick={handleNext}
            // disabled={
            //   loading ||
            //   (filterInputs.nationalCode === "" &&
            //     filterInputs.birthDay === "" &&
            //     filterInputs.birthMonth === "" &&
            //     filterInputs.birthYear === "")
            // }
          >
            <span className="button__text"> استعلام از ثبت احوال</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
