import { Box } from "@mui/system";
import { TableComponent } from "../../components/tableComponent";
import { TableHead, TableRow, TableBody } from "@mui/material";
import { SortingTable } from "../../components/sortingTable";
export const KycIdentificationApp = () => {
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
      }}
    >
      {/* <SortingTable /> */}
      <TableComponent>
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody></TableBody>
      </TableComponent>
    </Box>
  );
};
