import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Iconify from "../Iconify";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { formatToPersian } from "../../utils/convertPersian";
import { convertToJalaliDate } from "../../utils";
import Button from "@mui/material/Button";
import * as React from "react";
import { useEffect } from "react";
import { messagesList, readMessages } from "../../actions/CallsReports";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Notification() {
  const dispatch = useDispatch();
  const { messages, unRead } = useSelector((state) => state.messagesSlice);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(messagesList({})).then(() => {});
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const messageHandler = () => {
    const unReadMessagesId = unRead?.map((item) => item.id);
    dispatch(
      readMessages({
        params: {},
        body: unReadMessagesId,
      })
    ).then(() => setAnchorEl(null));
    dispatch(messagesList({})).then(() => {});
  };

  return (
    <span>
      <IconButton
        size="large"
        aria-label="notif"
        color="inherit"
        onClick={handleClick}
        sx={{
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "#c6c6c6",
          width: "35px",
          height: "35px",
          // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Badge
          badgeContent={unRead.length}
          color="error"
          style={{ direction: "rtl" }}
        >
          <NotificationsNoneIcon color="action" />
          {/* <Iconify icon={"mdi:notifications"} width={22} height={22} /> */}
        </Badge>
      </IconButton>

      <Menu
        style={{ height: "600px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: "500px",
              padding: "2px",
              direction: "rtl",
              height: "500px",
              overflowY: "hidden",
            },
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div
          style={{
            padding: "5px 10px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ textAlign: "center" }}>اعلان ها</span>

          <span
            style={{
              backgroundColor: "#1976d2",
              width: "100px",
              borderRadius: "8px",
              padding: "3px 10px",
              color: "white",
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{unRead.length}</span>
            <span>خوانده نشده</span>
          </span>
        </div>
        <Divider component="li" />
        <div style={{ overflowY: "scroll", height: "400px" }}>
          {" "}
          {messages ? (
            messages.map((item) => (
              <MenuItem
                key={item.id}
                style={{
                  ...(!item.seenStatus
                    ? {
                        backgroundColor: "rgba(25, 118, 210, 0.08)",
                        color: "rgba(17,94,196,0.99)",
                      }
                    : { backgroundColor: "transparent" }),
                  margin: "5px 10px 8px",
                  borderRadius: "5px",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span style={{ display: "flex" }}>
                      {item.subject}
                      <span>
                        {item.priority === "HIGH" && (
                          <span
                            style={{
                              backgroundColor: "rgb(210, 16, 16)",
                              color: "white",
                              borderRadius: "10px",
                              padding: "2px 5px",
                              fontSize: "9px",
                              marginRight: "10px",
                            }}
                          >
                            فوری
                          </span>
                        )}
                      </span>
                    </span>
                    <span style={{ fontSize: "14px" }}>
                      {formatToPersian(convertToJalaliDate(item.startDate))}
                    </span>
                  </header>
                  <main
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      fontSize: "14px",
                      wordWrap: "break-word",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    {item.body}
                  </main>
                </div>
              </MenuItem>
            ))
          ) : (
            <span>پیامی موجود نمی باشد</span>
          )}
        </div>

        <div
          style={{
            textAlign: "left",
            padding: " 10px",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Button
            style={{
              width: "100px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
            onClick={() => messageHandler()}
          >
            همه را خواندم
          </Button>
        </div>
      </Menu>
    </span>
  );
}
