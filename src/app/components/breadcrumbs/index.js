import { Breadcrumbs, Grid, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const BreadcrumbsLayout = ({ titles }) => {
  return (
    <Grid container justifyContent={"right"}>
      <Breadcrumbs
        separator={<NavigateBeforeIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {titles.map((e, i) => (
          <Typography key={e}>{e}</Typography>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};
