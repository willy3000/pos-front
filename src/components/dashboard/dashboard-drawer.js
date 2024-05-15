import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Avatar,
  Badge,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useSelector } from "react-redux";
import DashboardItem from "./dashboard-item";
import {} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactInfo from "./contact/contact-info";

export default function DashboardDrawer(props) {
  const { sections, user } = props;
  const [base64String, setBase64String] = useState(null);
  const { settings } = useSelector(({ settings }) => settings);
  const [contactInfo, setContactInfo] = useState(false)

  const onCloseContactInfo = () => {
    setContactInfo(false)
  }

  console.log("settings", settings);

  const getBase64String = () => {
    const bufferData = user?.logo?.buffer;
    const base64String = bufferData ? bufferData.toString("base64") : null;
    console.log("string bas64", base64String);
    setBase64String(base64String);
  };

  useEffect(() => {
    getBase64String();
  }, [user]);

  return (
    <>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingX: "35px",
              paddingTop: "35px",
              // paddingBottom: "15px",
              width: "100%",
            }}
          >
            {user.logo ? (
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: settings.logoBackground
                    ? null
                    : "transparent",
                }}
              >
                <img
                  src={`data:image/jpeg;base64, ${base64String}`}
                  alt=""
                  width={"100%"}
                />
              </Avatar>
            ) : (
              <Avatar
                sx={{ width: 100, height: 100 }}
                backgroundColor={"transparent"}
              ></Avatar>
            )}
          </Box>
          <Box
            sx={{
              paddingY: "18px",
              width: "200px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              noWrap
              variant="title"
              sx={{ fontWeight: "bold" }}
              overflow="ellipsis"
            >
              {user?.businessname}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <List>
          {sections.map((section, index) => (
            <DashboardItem {...{ section, index }} key={section.id}/>
          ))}
        </List>
        <Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingX: "10px",
              paddingY: "20px",
            }}
          >
            <Button variant="contained" startIcon={<LocalPhoneIcon />} onClick={() => setContactInfo(true)}>
              Get in Touch
            </Button>
          </Box>
        </Box>
      </Box>
      <ContactInfo {...{open: contactInfo, onClose: onCloseContactInfo}}/>
    </>
  );
}
