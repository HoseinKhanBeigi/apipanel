import { useState } from "react";
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Avatar,
} from "@mui/material";
import Iconify from "./Iconify";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { postNeshanLogoutAction } from "./logout/logout";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={Link}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={Link}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        direction: "rtl",
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText
        disableTypography
        primary={title}
        sx={{ textAlign: "right" }}
      />
      {info && info}
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, ...other }) {
  const pathname = usePathname();

  const match = (path) => {
    return path ? path === pathname : false;
  };

  return (
    <Box {...other} sx={{ paddingTop: "100px" }}>
      <List disablePadding sx={{ p: 1 }}>
        <ListItem sx={{ marginBottom: "32px", direction: "rtl", gap: "20px" }}>
          <Avatar style={{}} />
          <ListItemText
            sx={{ textAlign: "right" }}
            primary={"user Name"}
            secondary={"user@example.com"}
          ></ListItemText>
        </ListItem>

        <ListItemStyle
          component={Link}
          to={"/login"}
          onClick={() => {
            const idToken = localStorage.getItem("id_token");
            // const authToken = localStorage.getItem("token");
            // await dispatch(logout());
            window.location.assign(
              `${process.env.AUTH_BASEURL}/logout?redirect_uri=${encodeURI(
                `${window.location.origin}/logout?state=success`
              )}&post_logout_redirect_uri=${encodeURI(
                `${window.location.origin}/logout?state=success`
              )}&id_token_hint=${idToken}`
            );
          }}
          sx={{
            direction: "rtl",
          }}
        >
          <ListItemIconStyle>
            <Iconify
              icon={"mdi:logout"}
              width={22}
              height={22}
              sx={{ color: "red" }}
            />
          </ListItemIconStyle>
          <ListItemText
            disableTypography
            primary={"خروج"}
            sx={{ textAlign: "right", color: "red" }}
          />
        </ListItemStyle>
      </List>
    </Box>
  );
}
