import React, { useState } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CacheInput from "../../cacheInput";

const SearchInputWithCurve = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log("Search Text:", event.target.value);
  };

  return (
    <CacheInput>
      <Box
        sx={{
          width: "100%",
          // maxWidth: "20%",
        }}
      >
        <TextField
          fullWidth
          size="small" // Reduce height
          variant="outlined"
          dir="rtl"
          value={searchText}
          onChange={handleSearchChange}
          // placeholder="فیلتر..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            background: "#e8f1ff", // Custom background color
            borderColor: "#e8f1ff",
            borderRadius: "20px", // Fully curved corners
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            "& .MuiOutlinedInput-root": {
              height: "40px", // Explicit height for reduced size
              borderRadius: "20px", // Curves applied to all corners
              background: "#e8f1ff", // Custom background color
              borderColor: "transparent", // Transparent border
              "& fieldset": {
                borderColor: "transparent", // Transparent border for the outlined variant
              },
              "&:hover fieldset": {
                borderColor: "transparent", // Keep border transparent on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent", // Keep border transparent on focus
              },
            },
          }}
        />
      </Box>
    </CacheInput>
  );
};

export default SearchInputWithCurve;
