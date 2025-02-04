import { useState } from "react";
import {
  Button,
  CardActions,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import AdapterJalali1 from "../hook-form/RHdatePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import AdapterJalali, {
//   DateReformat,
//   persianNumToEnglishNum,
// } from "../reports/DatePickerWrapper/DatePickerWrapper";

export default function AdvancedSearch({
  onSearch,
  searchData,
  setFilters,
  filters,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const onChange = (name) => (value) => {
    setFilters({ ...filters, [name]: value });
  };

  const onChangeInput = (name) => (e) => {
    setFilters({ ...filters, [name]: e.target.value });
  };
  const toggleShowFilters = () => setShowFilters((s) => !s);

  const createInputs = ({
    required,
    placeholder,
    name,
    title,
    error,
    disabled,
  }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          required={required}
          placeholder={placeholder}
          id={name}
          label={title}
          error={error}
          disabled={disabled}
          value={filters[name]}
          onChange={onChangeInput(name)}
        />
      </div>
    );
  };

  const handleDropDownChange = (value, name, multiple, outputType) => {
    let output = "";
    switch (outputType) {
      case "int":
        output = Number(value);
        break;
      default:
        output = value;
    }

    if (multiple) {
      if (filters[name]) {
        onChange(name)([...filters[name], output]);
      } else {
        onChange(name)([output]);
      }
    } else {
      return onChange(name)(output);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  const [filterUser, setFilterUser] = useState();

  const handleChange = (e) => {
    setFilterUser(e.target.value);
  };
  const createDropDown = ({
    name,
    data,
    multiple,
    title,
    isMultiple,
    outputType,
    placeholder = "",
  }) => {
    if (isMultiple) {
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select
            label={title}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder={placeholder}
            // input={<OutlinedInput />}
            multiple={isMultiple}
            // displayEmpty
            onChange={(e) => {
              return handleDropDownChange(
                e.target.value,
                name,
                multiple,
                outputType
              );
            }}
            value={filters[name] || []}
            style={{ width: "100%" }}
            MenuProps={MenuProps}
          >
            {Object.keys(data).map((key) => (
              <MenuItem
                style={{
                  direction: "rtl",
                  border: "1px solid  black rgba(0, 0, 0, 0.87)",
                }}
                key={key}
                value={key}
              >
                {data[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>

        <Select
          label={title}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => {
            handleDropDownChange(e.target.value, name, multiple, outputType);
            handleChange(e);
          }}
          value={filterUser || ""}
          style={{ width: "100%" }}
          //   MenuProps={MenuProps}
        >
          {Array.isArray(data) &&
            data.map((item) => {
              return (
                <MenuItem
                  style={{
                    direction: "rtl",
                    border: "1px solid  black rgba(0, 0, 0, 0.87)",
                  }}
                  key={item?.id}
                  value={item?.id}
                >
                  {item?.apiName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    );
  };

  const createDateTimePicker = ({ name, title, defaultValue }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
          width: "100%",
        }}
      >
        {/* <AdapterJalali
          label={title}
          defaultValue={defaultValue}
          onChange={onChange(name)}
        /> */}
      </div>
    );
  };

  const handleFields = (item) => {
    switch (item?.type) {
      case "input":
        return createInputs(item);
      case "dropDown":
        return createDropDown(item);
      case "date":
        return createDateTimePicker(item);
      default:
        return <></>;
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    onSearch(filters);
    setShowFilters(false);
  };

  const handleCancel = () => {
    setShowFilters(false);
  };

  return (
    <>
      <Button
        onClick={toggleShowFilters}
        variant="contained"
        disableElevation
        endIcon={showFilters ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        {showFilters ? "پنهان کردن" : "فیلتر"}
      </Button>
      {showFilters && (
        <Box>
          <Card variant="outlined">
            <CardContent sx={{ direction: "ltr" }}>
              <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
              >
                {searchData.map((item, index) => {
                  if (item.size) {
                    return (
                      <Grid
                        key={index}
                        container
                        spacing={1}
                        xs={12}
                        sx={{ padding: "10px", gap: "20px" }}
                      >
                        {handleFields(item)}
                      </Grid>
                    );
                  }
                  return (
                    <Grid
                      key={index}
                      container
                      spacing={1}
                      xs={12}
                      sm={6}
                      sx={{ padding: "10px", gap: "20px" }}
                    >
                      {handleFields(item)}
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={handleSubmit} size="small">
                اعمال فیلتر
              </Button>
              <Button onClick={handleCancel} size="small">
                انصراف
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
}
