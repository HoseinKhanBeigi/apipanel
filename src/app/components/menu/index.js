import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function AccountMenu({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const months = [
    { name: "دوره ۱", startDate: "2024-03-20", endDate: "2024-04-19" },
    { name: "دوره ۲", startDate: "2024-04-20", endDate: "2024-05-20" },
    { name: "دوره ۳", startDate: "2024-05-21", endDate: "2024-06-20" },
    { name: "دوره ۴", startDate: "2024-06-21", endDate: "2024-07-21" },
    { name: "دوره ۵", startDate: "2024-07-22", endDate: "2024-08-21" },
    { name: "دوره ۶", startDate: "2024-08-22", endDate: "2024-09-21" },
    { name: "دوره ۷", startDate: "2024-09-22", endDate: "2024-10-21" },
    { name: "دوره ۸", startDate: "2024-10-22", endDate: "2024-11-20" },
    { name: "دوره ۹", startDate: "2024-11-21", endDate: "2024-12-20" },
    { name: "دوره ۱۰", startDate: "2024-12-21", endDate: "2025-01-19" },
    { name: "دوره ۱۱", startDate: "2025-01-20", endDate: "2025-02-18" },
    { name: "دوره ۱۲", startDate: "2025-02-19", endDate: "2025-03-20" },
  ];

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    router.replace(
      `/reports?page=0&size=10&limit=10&startDate=${e.startDate}&endDate=${e.endDate}`
    );
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="جزئیات دوره ها">
          <Button
            onClick={handleClick}
            size="small"
            variant="outlined"
            sx={{}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            جزییات
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={()=>setAnchorEl(null)}
        onClick={()=>setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {months.map((e, i) => (
          <MenuItem key={i} sx={{ fontSize: "12px" }}>
            <a
              href={`/reports?page=0&size=10&limit=10&startDate=${e.startDate}&endDate=${e.endDate}&id=${id}`}
              prefetch
            >
              {e.name}
            </a>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
