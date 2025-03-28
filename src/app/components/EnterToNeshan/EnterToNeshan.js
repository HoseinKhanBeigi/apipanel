"use client";
import React from "react";
import crypto from "crypto-browserify";
import s from "./Login.module.scss";

export default function EnterToNeshan() {
  function base64URLEncode(str) {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest();
  }

  const popupwindow = (url, title, w, h) => {
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    return window.open(
      url,
      title,
      `channelmode=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };
  function getFirstWordBeforeDot(url) {
    try {
      // Use URL constructor to extract hostname
      const hostname = new URL(url).hostname;
      // Match the first word before the first dot
      const match = hostname.match(/^([^.]+)/);
      // Return the matched word or an empty string if no match
      return match ? match[1] : "";
    } catch (error) {
      console.error("Invalid URL:", error);
      return "";
    }
  }

  const openNeshanPopup = () => {
    const verifier = base64URLEncode(crypto.randomBytes(32));
    const challenge = base64URLEncode(sha256(verifier));
    const redirectUri = `${window.location.origin}/auth`;
    const client_id = getFirstWordBeforeDot(window.location.origin);
    localStorage.setItem("verifier", verifier);
    let clientID = "";
    clientID = `api-panel-${client_id}`;
    if (
      window.location.origin === "https://levant.apipanel.levants.io" ||
      window.location.origin === "http://localhost:3000" ||
      window.location.origin === "https://apipanel.uat.kian.digital"
    ) {
      clientID = "api-panel";
    }
    if (window.location.origin === "https://sandbod.apipanel.levants.io") {
      clientID = `api-panel-sanbod`;
    }

    if (window.location.origin === "https://mabnacard.apipanel.levants.io") {
      clientID = "api-panel-mabna-card-aria";
    }
    if (window.location.origin === "https://iransign.apipanel.levants.io") {
      clientID = "api-panel-iran-sign";
    }

    const url = `${process.env.AUTH_BASEURL}/auth?&client_id=${clientID}&redirect_uri=${redirectUri}&scope=openid&response_type=code&code_challenge_method=S256&code_challenge=${challenge}`;
    popupwindow(url, "_self", "ورود از طریق نشان");
  };

  return (
    <div className={s.container}>
      <div
        style={{
          marginLeft: "0px",
          marginRight: "0px",
          display: "flex",
          direction: "rtl",
          overflow: "hidden",
          height: "95%",
        }}
      >
        <div style={{ padding: "42px", width: "37%", overflow: "hidden" }}>
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60%"
              height="30%"
              viewBox="0 0 70 66"
              fill="none"
            >
              <g clip-path="url(#clip0_1169_201)">
                <path
                  d="M2.24 17.7803C1.63365 17.5272 1.10712 17.1147 0.716267 16.5865C0.325416 16.0583 0.0848201 15.4342 0.0200046 14.7803C0.0200046 14.6703 0.0200046 14.5103 0.0200046 14.3003C0.018322 13.6947 0.0854186 13.0908 0.220005 12.5003C0.347562 11.9191 0.535239 11.3527 0.780005 10.8103L2.21 11.5203C1.87198 12.3452 1.67262 13.2204 1.62 14.1103C1.60771 14.2567 1.60771 14.4039 1.62 14.5503C1.73 15.3003 2.31 15.8903 3.35 16.3003C4.81099 16.7753 6.34512 16.9852 7.88 16.9203C9.26605 16.9531 10.6506 16.8086 12 16.4903C12.9444 16.2683 13.8157 15.8068 14.53 15.1503C15.2099 14.4716 15.7144 13.6376 16 12.7203L17.56 12.8903C17.3434 13.5359 17.2221 14.2097 17.2 14.8903C17.1677 15.1352 17.1919 15.3842 17.2706 15.6184C17.3494 15.8525 17.4806 16.0655 17.6543 16.2411C17.828 16.4167 18.0395 16.5503 18.2728 16.6316C18.506 16.713 18.7548 16.7399 19 16.7103L19.1 17.6603L19 18.6003C18.2201 18.6262 17.457 18.3706 16.85 17.8803C16.2714 17.3674 15.9131 16.6509 15.85 15.8803C15.0361 16.9197 13.9333 17.6955 12.68 18.1103C11.1197 18.6079 9.48721 18.8412 7.85 18.8003C5.92642 18.8967 4.00655 18.5476 2.24 17.7803ZM6.47 9.32031L8 10.8103L6.47 12.3003L5 10.8103L6.47 9.32031ZM10.23 9.32031L11.72 10.8103L10.23 12.3003L8.74 10.8103L10.23 9.32031Z"
                  fill="#ffffff"
                />
                <path
                  d="M18.79 16.7101H19.89C20.7207 16.7672 21.5526 16.616 22.31 16.2701C22.5511 16.1353 22.7494 15.9353 22.882 15.693C23.0147 15.4507 23.0763 15.1759 23.06 14.9001C23.0113 14.2175 22.87 13.5447 22.64 12.9001C22.4479 12.2361 22.2141 11.5848 21.94 10.9501L23.46 10.1501C23.7829 10.905 24.0568 11.68 24.28 12.4701C24.5327 13.2634 24.674 14.088 24.7 14.9201C24.7212 15.4439 24.6181 15.9652 24.3991 16.4414C24.1801 16.9177 23.8514 17.3353 23.44 17.6601C22.3873 18.3435 21.1425 18.6696 19.89 18.5901H18.79V16.7101ZM22.11 5.87012L23.6 7.37012L22.11 8.86012L20.62 7.37012L22.11 5.87012Z"
                  fill="#ffffff"
                />
                <path
                  d="M27.4 14.21C27.4 12.31 27.4 10.34 27.29 8.3C27.18 6.26 27.12 4.94 27.03 4.3L28.71 4C28.79 4.65 28.88 6.05 28.97 8.22C29.06 10.39 29.11 12.43 29.11 14.38C29.11 16.33 29.06 17.78 28.96 18.7L27.26 18.49C27.3793 17.0666 27.426 15.6381 27.4 14.21Z"
                  fill="#ffffff"
                />
                <path
                  d="M35.79 21.2401C36.2739 20.9587 36.6948 20.5809 37.0268 20.1303C37.3588 19.6796 37.5947 19.1656 37.72 18.6201C36.4716 18.6658 35.2223 18.5583 34 18.3001C33.5789 18.2285 33.1797 18.0615 32.8331 17.812C32.4864 17.5624 32.2014 17.2368 32 16.8601C31.7628 16.3679 31.6463 15.8263 31.66 15.2801C31.6667 14.529 31.8267 13.7872 32.13 13.1001C32.4192 12.4155 32.8484 11.799 33.39 11.2901C33.8437 10.8488 34.4473 10.5952 35.08 10.5801C35.4576 10.5831 35.8304 10.6646 36.1747 10.8196C36.5191 10.9745 36.8274 11.1995 37.08 11.4801C37.7014 12.1468 38.181 12.9327 38.49 13.7901C38.842 14.7299 39.0706 15.7114 39.17 16.7101H40L40.11 17.6601L40 18.6001H39.21C38.9625 20.1216 38.1389 21.4895 36.91 22.4201C35.3889 23.5543 33.6205 24.3117 31.75 24.6301L31.21 23.0001C32.8279 22.6858 34.378 22.0901 35.79 21.2401ZM34.87 16.5201C35.8199 16.6617 36.7798 16.7252 37.74 16.7101C37.6375 15.6598 37.3282 14.6403 36.83 13.7101C36.6834 13.3553 36.445 13.046 36.1391 12.814C35.8333 12.582 35.4712 12.4356 35.09 12.3901C34.9227 12.3873 34.7566 12.4187 34.6019 12.4823C34.4471 12.5459 34.307 12.6404 34.19 12.7601C33.5766 13.3431 33.2173 14.1442 33.19 14.9901C33.1792 15.2627 33.245 15.5329 33.38 15.7701C33.5623 15.9921 33.7891 16.1735 34.0457 16.3026C34.3023 16.4318 34.5831 16.5059 34.87 16.5201Z"
                  fill="#ffffff"
                />
                <path
                  d="M39.73 16.71H40.42C40.7338 16.7421 41.0508 16.7099 41.3517 16.6153C41.6526 16.5207 41.931 16.3658 42.17 16.16C42.5561 15.6894 42.7428 15.0864 42.69 14.48C42.69 13.7 42.63 11.98 42.49 9.33C42.35 6.68 42.24 5.01 42.15 4.33L43.83 4C43.91 4.68 44.02 6.37 44.15 9.09C44.28 11.81 44.35 13.57 44.35 14.38C44.407 15.5062 44.0314 16.6117 43.3 17.47C42.9367 17.8568 42.4937 18.1601 42.0016 18.3586C41.5094 18.5572 40.98 18.6464 40.45 18.62H39.73V16.71Z"
                  fill="#ffffff"
                />
                <path
                  opacity="0.85"
                  d="M69.72 0H63.36V6.36H69.72V0Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.55"
                  d="M69.72 14.8398H63.36V21.1998H69.72V14.8398Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.7"
                  d="M69.72 7.41992H63.36V13.7799H69.72V7.41992Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.55"
                  d="M54.88 0H48.52V6.36H54.88V0Z"
                  fill="#0058FF"
                />
                <path d="M77.13 0H70.77V6.36H77.13V0Z" fill="#0058FF" />
                <path
                  opacity="0.7"
                  d="M77.13 14.8398H70.77V21.1998H77.13V14.8398Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.85"
                  d="M77.13 7.41992H70.77V13.7799H77.13V7.41992Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.55"
                  d="M77.13 22.25H70.77V28.61H77.13V22.25Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.7"
                  d="M62.3 0H55.94V6.36H62.3V0Z"
                  fill="#0058FF"
                />
                <path
                  opacity="0.55"
                  d="M62.3 7.41992H55.94V13.7799H62.3V7.41992Z"
                  fill="#0058FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_1169_201">
                  <rect width="77" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </>
          {/* <h1 className={s.slogan}></h1> */}
          <h2 className={s.text_welcome}> به پنل مشتریان لوانت خوش آمدید</h2>
          <button
            type="primary"
            className={s.btn}
            onClick={() => openNeshanPopup()}
          >
            <i className={s.icon} />
            ورود
          </button>
        </div>
        <div className={s.pic_holder} style={{ width: "70%" }}>
          <div className={s.left_pic} />
        </div>
      </div>
      <p
        className={s.paragraphLeggal}
        style={{
          marginTop: "10px",
          textAlign: "right",
          width: "100%",
          height: "5%",
        }}
      >
        تمامی حقوق مادی و معنوی این وبسایت متعلق به مجموعه لوانت است. حق کپی
        رایت محفوظ است. خرداد ۱۴۰۳
      </p>
    </div>
  );
}
