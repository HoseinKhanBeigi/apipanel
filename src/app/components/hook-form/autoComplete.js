import * as React from "react";
import { Autocomplete, TextField, Paper } from "@mui/material";
import CacheInput from "../../cacheInput";

export default function AutocompleteInput({
  title,
  multiple,
  data,
  onChange,
  inputValue,

  name,
}) {
  const customPaper = (props) => {
    return <Paper {...props} style={{ direction: "rtl" }} />;
  };

  return (
    <CacheInput>
      <Autocomplete
        fullWidth
        multiple={multiple}
        id="tags-outlined"
        options={data}
        getOptionLabel={(option) => option.label}
        onChange={onChange}
        value={inputValue}
        PaperComponent={customPaper}
        renderOption={(props, option) => (
          <li
            {...props}
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}
          >
            {option.label}
          </li>
        )}
        componentsProps={{
          popper: {
            modifiers: [
              {
                name: "flip",
                enabled: false,
              },
              {
                name: "preventOverflow",
                enabled: false,
              },
            ],
          },
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            dir="rtl"
            {...params}
            name={name}
            value={inputValue}
            label={title}
            variant="outlined"
          />
        )}
      />
    </CacheInput>
  );
}
