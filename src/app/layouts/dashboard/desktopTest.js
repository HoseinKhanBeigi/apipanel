"use client";
import { useState, useReducer } from "react";
// material
import { alpha, styled, useTheme } from "@mui/material/styles";
import SearchInputWithIcon from "../../components/filterPopup";
import { Grid, Box } from "@mui/material";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "../../components/Iconify";
import { usePathname, useRouter } from "next/navigation";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { CollapseMenu } from "../../components/collapseMenu";
import ListItem from "@mui/material/ListItem";
import { dashboardConfig, menus } from "./NavConfig";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/notification";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  backgroundColor: "#f7f8fc",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleDrawerClose = () => {
    setSideBarMenu(!toggleSideBarMenu);
  };
  const [listMenus, dispatchCollapse] = useReducer(reducer, menus);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleComplete = (item) => {
    dispatchCollapse({ type: "OPENED", id: item.id });
  };
  return (
    <Grid
      container
      sx={{
        background: "#f7f8fc",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: `calc(100% - ${240}px)`,
          background: "#f7f8fc",
          // height: "10%",
          display: "flex",
          gap: "12px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        ml={1}
        mr={1}
        mt={2}
        mb={2}
      >
        <SearchInputWithIcon onClick={handleOpenDialog} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          gap: "16px",
          // overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "white",
            borderRadius: "25px",
            border: "2px solid #f7f8fc",
            width: "100%",
            padding: "32px",
            overflowX: "scroll",
            // height: "100%",
          }}
        >
          {children}
        </Box>
        <Drawer
          variant="permanent"
          open={toggleSideBarMenu}
          anchor="right"
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#f7f8fc",
              borderLeft: "none",
              justifyContent: "space-between",
              marginLeft: "12px",
              zIndex: 999,
            },
          }}
        >
          <Box>
            <DrawerHeader sx={{ justifyContent: "flex-end" }}>
              <IconButton onClick={handleDrawerClose}>
                <DensityMediumOutlinedIcon />
              </IconButton>
            </DrawerHeader>

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
                      borderRadius: "20px 8px 8px 20px", // Curve left side on hover
                      // backgroundColor: "#1976d2", // Optional hover background
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
                      borderRadius: "0 8px 8px 0", // Default: rounded on the right side
                      transition: "all 0.3s ease-in-out", // Smooth transition
                      "&:hover": {
                        borderRadius: "20px 8px 8px 20px", // Curve left side on hover
                        backgroundColor: "#f0f0f0", // Optional hover background
                      },
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
                  text={menu.icon}
                  toggleSideBarMenu={toggleSideBarMenu}
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
                            borderRadius: "20px 8px 8px 20px", // Curve left side on hover
                            // backgroundColor: "#1976d2", // Optional hover background
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
                            borderRadius: "0 8px 8px 0", // Default: rounded on the right side
                            transition: "all 0.3s ease-in-out", // Smooth transition
                            "&:hover": {
                              borderRadius: "20px 8px 8px 20px", // Curve left side on hover
                              backgroundColor: "#f0f0f0", // Optional hover background
                            },
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
                      borderRadius: "0 8px 8px 0", // Default: rounded on the right side
                      transition: "all 0.3s ease-in-out", // Smooth transition
                      "&:hover": {
                        borderRadius: "20px 8px 8px 20px", // Curve left side on hover
                        backgroundColor: "#f0f0f0", // Optional hover background
                      },
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
          </Box>

          <List>
            {[""].map((text, idx) => (
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
                  // onClick={() => {
                  //   (() => {
                  //     const idToken = localStorage.getItem("id_token");
                  //     localStorage.clear();
                  //     window.location.assign(
                  //       `${
                  //         process.env.AUTH_BASEURL
                  //       }/logout?redirect_uri=${encodeURI(
                  //         `${window.location.origin}/logout?state=success`
                  //       )}&post_logout_redirect_uri=${encodeURI(
                  //         `${window.location.origin}/logout?state=success`
                  //       )}&id_token_hint=${idToken}`
                  //     );
                  //   })();
                  //   router.push(`/login`);
                  // }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: toggleSideBarMenu ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* <LevantLogo /> */}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: toggleSideBarMenu ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Grid>
  );
}
