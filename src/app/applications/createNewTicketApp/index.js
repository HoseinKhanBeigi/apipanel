"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import AutocompleteInput from "../../components/hook-form/autoComplete";
import MinHeightTextarea from "../../components/hook-form/textarea";
import InputFileUpload from "../../components/uploadBtn";
import { Divider, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CacheInput from "../../cacheInput";

export default function CreateNewTicketApp() {
  const handleChangeForCallStatus = () => {};
  return (
    <Grid container gap={3} justifyContent={"center"}>
      <Grid item container justifyContent={"end"} gap={2}>
        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            onChange={handleChangeForCallStatus}
          />
        </Grid>
        <Grid item xs={3}>
          <AutocompleteInput
            name={"desc"}
            title={"نام سرویس"}
            multiple
            // inputValue={filterInputs.desc || []}
            data={[]}
            onChange={handleChangeForCallStatus}
          />
        </Grid>
        <Grid item xs={3}>
          <CacheInput>
            <TextField
              fullWidth
              id="outlined-basic"
              // value={filterInputs.responseHttpStatus}
              label="موضوع"
              variant="outlined"
              // onChange={onChangeCode}
              dir="rtl"
            />
          </CacheInput>
        </Grid>
      </Grid>

      <Grid item container justifyContent={"end"}>
        <Grid item xs={3}>
          <CacheInput>
            <TextField
              label="پیام"
              multiline
              rows={3} // Specify number of rows to mimic textarea height
              variant="outlined" // Use 'outlined' or 'standard' for a border style
              fullWidth
              dir="rtl" // RTL direction
              InputProps={{
                style: {
                  fontSize: "1rem", // Customize font size if needed
                  lineHeight: "1.5",
                  padding: "10px", // Padding for a more textarea-like feel
                },
              }}
            />
          </CacheInput>
        </Grid>
      </Grid>
      <Grid item container justifyContent={"end"}></Grid>
      <Grid item container justifyContent={"end"} gap={2}>
        <Button variant="outlined">ثبت تیکت</Button>
        <Button variant="outlined">انصراف</Button>
        <InputFileUpload />
      </Grid>
    </Grid>
  );
}
