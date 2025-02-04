import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";

import TableContainer from "@mui/material/TableContainer";

export const TableComponent = ({ children }) => {
  return (
    <TableContainer
      component={Paper}
      style={{
        maxHeight: 800,
        border: "unset",
        boxShadow: "unset",
        // width: "100%",
      }}
    >
      <Table
        dir="rtl"
        stickyHeader
        aria-label="sticky table"
        style={{
          width: "100%",
          borderTop: "1px solid #EFF3F3",
          borderRight: "1px solid #EFF3F3",
          borderLeft: "1px solid #EFF3F3",
        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
};
