"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

import { Divider, Grid } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Box, Card, Typography } from "@mui/material";
import { servicesList } from "../../actions/CallsReports";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import Button from "@mui/material/Button";

export default function Documents() {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.servicesListSlice);

  const newEntities = [
    {
      id: 10000,
      apiName: "دریافت توکن",
      docPath: "getToken",
      isNewDoc: 3,
    },
    {
      id: 10001,
      apiName: "خطاها",
      docPath: "errors",
      isNewDoc: 3,
    },
    ...entities,
  ];

  useEffect(() => {
    if (!entities.length) {
      dispatch(servicesList({})).then(() => {});
    }
  }, []);

  const downloadFile = async (e) => {
    try {
      const response = await fetch(
        `${process.env.SERVER_FILE}/file/manual/download/${e.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${e.docPath}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <Grid
      container
      gap={2}
      justifyContent={"center"}
      sx={{
        maxHeight: "600px",
        overflowY: "auto",
        scrollBehavior: "smooth",
        overflowX: "hidden",
      }}
    >
      {newEntities.map((e, i) => (
        <Grid key={`${i}`} item sx={3} mt={1}>
          <Card
            sx={{
              // marginTop: "18px",
              width: "380px",
              height: "105px",
              padding: "16px",
              boxShadow: 3,
            }}
          >
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={3}
            >
              <Button
                variant="outlined"
                onClick={() => downloadFile(e)}
                disabled={e?.docPath ? false : true}
              >
                {"دانلود"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {e.isNewDoc === 1 && (
                  <Chip
                    label="جدید"
                    variant="outlined"
                    color="error"
                    sx={{ marginRight: "4px" }}
                  />
                )}
                {e.isNewDoc === 3 && (
                  <Chip
                    label="عمومی"
                    variant="outlined"
                    color="success"
                    sx={{ marginRight: "4px" }}
                  />
                )}

                <Typography fontSize={12}>{e.apiName}</Typography>
                <PictureAsPdfOutlinedIcon />
              </Box>
            </Grid>
            <Grid container justifyContent={"space-between"} mb={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CheckOutlinedIcon color="success" />
                <Typography fontSize={12} color={"green"}>
                  {e.enable ? "فعال" : "غیر فعال"}
                </Typography>
              </Box>
              <Typography fontSize={12}>{"وضعیت"}</Typography>
            </Grid>

            <Divider />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
