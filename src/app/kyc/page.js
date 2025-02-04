"use client";
// app/kyc/page.js

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Kyc = ({ searchParams }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (searchParams.data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(searchParams.data));
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [searchParams.data]);

  return (
    <div>
      {data ? (
        <>
          <div>
            alivenessVerified: {data.alivenessVerified ? "true" : "false"}
          </div>
          <div>kycId: {data.kycId}</div>
          <div>faceVerified: {data.faceVerified ? "true" : "false"}</div>
          <div>processTime: {data.processTime}</div>
        </>
      ) : (
        <div>Data not available</div>
      )}
    </div>
  );
};

export default Kyc;
