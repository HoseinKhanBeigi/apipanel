"use client";
import { useState, useReducer } from "react";
// material
import { alpha, styled, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import { Card, Grid, Typography, Box } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Iconify from "../../components/Iconify";

import { saveToken } from "../../GlobalRedux/features/getTokenSlice";

import { usePathname, useRouter } from "next/navigation";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import Button from "@mui/material/Button";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { postNeshanLogoutAction } from "../../components/logout/logout";
import { CollapseMenu } from "../../components/collapseMenu";
import Filter from "../../components/filterSideBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import {
  dashboardConfig,
  reportsConfig,
  navConfig,
  supportSection,
  implimentation,
  finantial,
  menus,
} from "./NavConfig";
import { formatToPersian } from "../../utils/convertPersian";
import { servicesList } from "../../actions/CallsReports";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/notification";
import "./index.scss";

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
const MainStyle = styled("div")(({ theme }) => ({}));

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

const reducer = (state, action) => {
  switch (action.type) {
    case "OPENED":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, open: !todo.open };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

export default function DesktopLayout({ children, titleOfPage }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const match = (path) => {
    return path ? path.split("?")[0] === pathname.split("/")[1] : false;
  };
  const [toggleSideBarMenu, setSideBarMenu] = useState(true);
  const [user, setUser] = useState({ user_fullname: "", user_name: "" });
  const theme = useTheme();
  const router = useRouter();

  const { tokenState } = useSelector((state) => state.getTokenSlice);

  React.useEffect(() => {
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
  }, [tokenState]);

  // console.log()

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [listMenus, dispatchCollapse] = useReducer(reducer, menus);

  const handleComplete = (item) => {
    dispatchCollapse({ type: "OPENED", id: item.id });
  };
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent={"center"} spacing={2} mt={1}>
        <Grid container item xs={10} flexDirection={"column"}>
          <AppBar
            position="relative" /* This ensures the AppBar stays within the grid header */
            sx={{
              borderRadius: "12px",
              marginBottom: "16px",
            }} /* Custom color */
          >
            <Toolbar
              style={{
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <span>
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
          {/* <Grid container justifyContent={"space-between"} mt={"12px"}>
            {[1, 2, 3, 4].map((e, idx) => (
              <Card
                key={`${idx}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                  alignItems: "center",
                  height: "130px",
                  border: "1px solid",
                  borderRadius: "12px",
                }}
              >
                {["احراز هویت ویدیویی", "تعداد کل فراخوانی", "۲۳۰۰"].map(
                  (e, idx) => (
                    <div key={`${idx}`}>{e}</div>
                  )
                )}
              </Card>
            ))}
          </Grid> */}

          {/* <Filter /> */}

          <Box
            sx={{
              width: "100%",
              border: "1px solid",
              borderColor: "silver",
              borderRadius: "12px",
              overflowY: "scroll",
              height: "80vh",
              paddingTop: "12px",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            <Box
              style={{
                padding: "25px 50px",

                display: "flex",
                justifyContent: "center",
                alignItems: "space-between",
                flexDirection: "column",
                // marginTop: "20px",
                direction: "ltr",
                overflow: "hidden",
              }}
            >
              {children}
            </Box>
          </Box>
        </Grid>
        <Grid container item xs={2} gap={2} direction="column">
          <Grid
            container
            height={"240px"}
            direction="column"
            gap={"8px"}
            alignItems="center"
            justifyContent={"center"}
            sx={{
              border: "1px solid",
              borderColor: "silver",
              borderRadius: "12px",
            }}
          >
            <Grid container alignItems="center">
              <Grid
                item
                xs={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Grid>

              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="start"
              >
                <Avatar
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
              </Grid>

              <Grid item xs={2} container justifyContent="center">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* Company name */}
            <Grid item>
              <Typography>نام شرکت</Typography>
            </Grid>

            {/* User name */}
            <Grid item>
              <Typography variant="body1">نام نام خانوادگی کاربر</Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "200px" }}
              >
                سرویس های من
              </Button>
            </Grid>
          </Grid>

          <Drawer1
            variant="permanent"
            anchor="right"
            open={toggleSideBarMenu}
            sx={{
              border: "1px solid",
              borderColor: "silver",
              borderRadius: "12px",
              width: "100%" /* Match the width of the sidebar */,
              // height: "100%" /* Match the height of sidebar2 */,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width:
                  "100%" /* Ensure the drawer paper stays within the sidebar */,
                height:
                  "100%" /* Ensure the drawer paper fits the sidebar's height */,
                position: "relative" /* Ensure it stays inside the grid */,
              },
            }}
          >
            <Divider />
            <List>
              {dashboardConfig.map((text, idx) => (
                <ListItem
                  key={`${idx}`}
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
            {listMenus.map((menu, idx) => (
              <div key={`${idx}`}>
                <CollapseMenu
                  title={menu.title}
                  item={menu}
                  open={menu.open}
                  handleClick={handleComplete}
                >
                  <List>
                    {menu.listMenu.map((text, idx) => (
                      <ListItem
                        key={`${idx}`}
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
                            justifyContent: toggleSideBarMenu
                              ? "initial"
                              : "center",
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
                </CollapseMenu>
                <Divider />
              </div>
            ))}

            <List>
              {["خروج"].map((text, idx) => (
                <ListItem
                  key={`${idx}`}
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
                      (() => {
                        const idToken = localStorage.getItem("id_token");
                        localStorage.clear();
                        window.location.assign(
                          `${
                            process.env.AUTH_BASEURL
                          }/logout?redirect_uri=${encodeURI(
                            `${window.location.origin}/logout?state=success`
                          )}&post_logout_redirect_uri=${encodeURI(
                            `${window.location.origin}/logout?state=success`
                          )}&id_token_hint=${idToken}`
                        );
                      })();
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
        </Grid>
      </Grid>
    </Container>
  );
}

// https://onboarding-web.uat.kian.digital/onboarding/kt-brokerage?ref=u3vdvq3nqg
