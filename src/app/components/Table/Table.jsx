import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableBody,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PaginationComponent from "../pagination/Pagination";
import RowPerPage from "../RowPerPage/RowPerPage";

export default function AdminPanelTable({
  columns,
  entities,
  totalElements,
  handleChange,
  disablePagination,
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onRowChange = (newRowPerPage) => {
    setPage(1);
    setRowsPerPage(newRowPerPage);
  };

  useEffect(() => {
    handleChange(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const detailsRender = useMemo(() => {
    if (entities?.length > 0) {
      return entities?.map((row, rowIndex) => {
        return (
          <TableRow hover role="checkbox" key={row.code}>
            <TableCell style={{ width: "50px" }} align={"center"}>
              {rowIndex + (page - 1) * rowsPerPage + 1}
            </TableCell>
            {columns.map((column) => {
              const value = column.format
                ? column.format(row[column.id])
                : row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
    }
    return (
      <TableRow>
        <TableCell colSpan={6} align={"center"}>
          داده ای در دسترس نمیباشد
        </TableCell>
      </TableRow>
    );
  }, [entities]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 800, direction: "rtl" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "50px" }} align={"center"}>
                ردیف
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{detailsRender}</TableBody>
        </Table>
      </TableContainer>
      {!disablePagination && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <RowPerPage onPageChange={onRowChange} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <PaginationComponent
              setPage={setPage}
              page={page}
              count={Math.ceil(totalElements / rowsPerPage)}
            />
            {`تعداد کل:${totalElements || 0}`}
          </div>
        </div>
      )}
    </Paper>
  );
}
