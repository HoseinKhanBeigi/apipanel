import Pagination from "@mui/material/Pagination";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import CacheInput from "../../cacheInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaginationItem from "@mui/material/PaginationItem";
import { getQueryParams } from "../../utils";
import {formatToPersian} from "../../utils/convertPersian";

export const PaginationTable = ({
  status,
  entities,
  onChange,
  countPerPage,
}) => {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onChange(newPage);
    const params = { ...getQueryParams(), page: newPage - 1 };
    const queryString = new URLSearchParams(params).toString();
    router.replace(`?${queryString}`);
  };
  const [count, setCount] = React.useState(10);

  const handleChange = (event) => {
    countPerPage(event.target.value);
    setCount(event.target.value);
  };

  return (
    <>
      {status === "succeeded" && entities && (
        <CacheInput>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "100px",
              border:"1px solid #EFF3F3 ",
              borderTopWidth:"2px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div>{formatToPersian( entities?.totalElements)}</div>
              <div>{"تعداد کل آیتم ها"}</div>
              <FormControl variant="standard">
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={count}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>{formatToPersian(10)}</MenuItem>
                  <MenuItem value={20}>{formatToPersian(50)}</MenuItem>
                  <MenuItem value={100}>{formatToPersian( 100)}</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Pagination
              dir="rtl"
              count={Math.ceil(entities?.totalPages)}
              page={Number(page)}
              onChange={handleChangePage}
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowForwardIcon,
                    next: ArrowBackIcon,
                  }}
                  page={formatToPersian(item.page - 1)}
                  {...item}
                />
              )}
              sx={{
                // width: "100%",
                direction: "ltr",
                // height: "40px",
              }}
            />
          </div>
        </CacheInput>
      )}
    </>
  );
};
