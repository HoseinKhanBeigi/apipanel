import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CacheInput from "../../cacheInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelctInput({ title, multiple, data }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [chipLabel, setChipLabel] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const tes = [];
    if (multiple) {
      const filteredLabels = data
        .filter((response) => value.includes(response.value))
        .map((response) => response.label);

      setChipLabel(filteredLabels);
    }
    setPersonName(value);
  };

  const handleItemClick = (value) => {
    if (personName === value) {
      setPersonName(""); // Clear selection if the same item is clicked
    } else {
      setPersonName(value);
    }
  };

  return (
    <CacheInput>
      <FormControl>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          label={title}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple={multiple}
          value={personName}
          onChange={handleChange}
          renderValue={
            multiple
              ? () => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        direction: "ltr",
                      }}
                    >
                      {chipLabel.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }
              : false
          }
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem
              dir="rtl"
              key={name.label}
              value={name.value}
              // style={getStyles(name.value, personName, theme)}
              onClick={() => handleItemClick(name.value)}
            >
              {name.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CacheInput>
  );
}
