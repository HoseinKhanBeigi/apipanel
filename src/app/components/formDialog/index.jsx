import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const FormDialog = ({ openDialog, setOpenDialog }) => {
  const [formValues, setFormValues] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const handleClose = () => setOpenDialog(false);

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formValues);
    handleClose();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Form Dialog</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Field 1"
                variant="outlined"
                value={formValues.field1}
                onChange={handleChange("field1")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Field 2"
                variant="outlined"
                value={formValues.field2}
                onChange={handleChange("field2")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Field 3"
                variant="outlined"
                value={formValues.field3}
                onChange={handleChange("field3")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Field 4"
                variant="outlined"
                value={formValues.field4}
                onChange={handleChange("field4")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
