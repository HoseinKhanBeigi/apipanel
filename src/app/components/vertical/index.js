import * as React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import { Box } from "@mui/system";

export default function VerticalDividerMiddle() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <Box> 10</Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box> 20</Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box> 30</Box>
    </Card>
  );
}
