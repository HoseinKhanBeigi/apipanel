import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PaginationComponent({ setPage, count, page }) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Pagination
      sx={{
        margin: "15px 0",
        overflow: "hidden",
        float: "right",
        direction: "rtl",
      }}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }}
          {...item}
        />
      )}
      count={count}
      page={page}
      onChange={handleChangePage}
    />
  );
}
