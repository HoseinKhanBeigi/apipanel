"use client";
import { useState } from "react";
// material
import { alpha, styled, useTheme } from "@mui/material/styles";
import Iconify from "../../components/Iconify";
import { Grid, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { postNeshanLogoutAction } from "../../components/logout/logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { navConfig } from "./NavConfig";
import { formatToPersian } from "../../utils/convertPersian";
import { servicesList } from "../../actions/CallsReports";
import { useDispatch } from "react-redux";
import Notification from "../../components/notification";

const APP_BAR_MOBILE = 64;

const drawerWidth = 240;

const APP_BAR_DESKTOP = 64;

const RootStyle = styled("div")({
  display: "flex",
  height: "100%",
  overflowX: "hidden",
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  height: "90%",
  paddingTop: APP_BAR_MOBILE + 24,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" || prop !== "toggleSideBarMenu",
})(({ theme, open, toggleSideBarMenu }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `100%`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(toggleSideBarMenu && {
    width: `100%`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("div", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer1 = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  overflowX: "hidden",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const match = (path) => {
    return path ? path.split("?")[0] === pathname.split("/")[1] : false;
  };
  const [toggleSideBarMenu, setSideBarMenu] = useState(true);
  const [user, setUser] = useState({ user_fullname: "", user_name: "" });
  const theme = useTheme();
  const router = useRouter();

  const handleToggleSideBarMenu = () => {
    setSideBarMenu(!toggleSideBarMenu);
  };

  React.useEffect(() => {
    dispatch(servicesList({})).then(() => {});
    const token = localStorage.getItem("token");
    var base64Url = token?.split(".")[1];
    var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
    if (base64) {
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      setUser({
        user_fullname: JSON.parse(jsonPayload).user_fullname,
        user_name: JSON.parse(jsonPayload).user_name,
      });
    }
  }, []);

  return (
    <RootStyle>
      <AppBar position="fixed" open toggleSideBarMenu={toggleSideBarMenu}>
        <Toolbar
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <span
          // sx={{
          //   ...(!toggleSideBarMenu
          //     ? { marginRight: "56px" }
          //     : { marginRight: "0" }),
          // }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "10px",
                marginRight: "15px",
              }}
            >
              <div style={{ color: "white" }}>
                {formatToPersian(user.user_name)}
              </div>
              <div style={{ color: "white" }}>{user.user_fullname}</div>
            </div>
          </span>
          <Notification />
        </Toolbar>
      </AppBar>

      <Main>
        <Box
          sx={{
            background: "white",
            borderRadius: "25px",
            border: "2px solid #f7f8fc",
            width: "100%",
            padding: "32px",
            overflowX: "scroll",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Main>
      <Drawer1 variant="permanent" anchor="right" open={toggleSideBarMenu}>
        <DrawerHeader>
          <IconButton onClick={handleToggleSideBarMenu}>
            {toggleSideBarMenu ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navConfig.map((text) => (
            <ListItem
              key={text.path}
              disablePadding
              sx={{
                display: "block",
                direction: "rtl",
                ...(match(text.path) && {
                  color: "primary.main",
                  fontWeight: "fontWeightMedium",
                  bgcolor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                  ),
                }),
              }}
            >
              <ListItemButton
                onClick={() => router.push(`/${text.path}`)}
                sx={{
                  minHeight: 48,
                  direction: "rtl",
                  gap: "5px",
                  textAlign: "right",
                  justifyContent: toggleSideBarMenu ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: toggleSideBarMenu ? 3 : "auto",
                    justifyContent: "center",
                    ...(match(text.path) && {
                      fontWeight: "fontWeightMedium",
                      color: "#1976d2",
                    }),
                  }}
                >
                  {text.icon}
                </ListItemIcon>

                <ListItemText
                  primary={text.title}
                  sx={{ opacity: toggleSideBarMenu ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["خروج"].map((text) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", direction: "rtl" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  direction: "rtl",
                  gap: "5px",
                  textAlign: "right",
                  justifyContent: toggleSideBarMenu ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  // postNeshanLogoutAction();
                  localStorage.clear();
                  router.push(`/login`);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: toggleSideBarMenu ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Iconify
                    icon={"mdi:logout"}
                    width={22}
                    height={22}
                    sx={{ color: "red" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: toggleSideBarMenu ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer1>
    </RootStyle>
  );
}
