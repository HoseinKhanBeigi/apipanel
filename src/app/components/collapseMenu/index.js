import { useState } from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const CollapseMenu = ({
  title,
  children,
  handleClick,
  open,
  item,
  toggleSideBarMenu,
  text,
}) => {
  return (
    <>
      <DrawerHeader sx={{ justifyContent: "end" }}>
        <ListItemButton
          onClick={() => handleClick(item)}
          sx={{
            borderRadius: "0 8px 8px 0", // Default: rounded on the right side
            transition: "all 0.3s ease-in-out", // Smooth transition
            "&:hover": {
              borderRadius: "20px 8px 8px 20px", // Curve left side on hover
              backgroundColor: "#f0f0f0", // Optional hover background
            },
          }}
        >
          <ListItemText
            sx={{ textAlign: "right", opacity: toggleSideBarMenu ? 1 : 0 }}
            primary={title}
          />
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: toggleSideBarMenu ? 3 : "auto",
              justifyContent: "center",

              // ...(match(text.path) && {
              //   fontWeight: "fontWeightMedium",
              //   color: "#1976d2",
              // }),
            }}
          >
            {text}
          </ListItemIcon>
        </ListItemButton>
      </DrawerHeader>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
