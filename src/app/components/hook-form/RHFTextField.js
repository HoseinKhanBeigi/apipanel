import { TextField } from "@mui/material";

export default function RHFTextField({ name, ...other }) {
  return <TextField {...field} fullWidth value={field.value} {...other} />;
}
