import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const LayoutOfMainPages = ({ title, children }) => {
  <Grid container>
    <Typography>{title}</Typography>
    <Box>{children}</Box>
  </Grid>;
};
