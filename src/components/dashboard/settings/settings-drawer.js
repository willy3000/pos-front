import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Drawer,
  IconButton,
  TextField,
  Switch
} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getInitials } from "@/utils/constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateSettings } from "@/slices/settings";


export default function SettingsDrawer(props) {
  const { open, setOpen } = props;
  const { settings } = useSelector(({ settings }) => settings);
  const [newSettings, setNewSettings] = useState(settings)

  const dispatch = useDispatch();

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const transparentLogoChange = (e) => {
    console.log(e.target.checked)
    setNewSettings({...settings, logoBackground: e.target.checked})
  }

  const saveSettings = () => {
    dispatch(updateSettings(newSettings))
    setOpen(false)
  }

  return (
    <>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 450,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
          role="presentation"
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "primary.main",
                width: "100%",
                padding: "25px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconButton sx={{ color: "white" }} onClick={handleClose}>
                  <ClearIcon sx={{ color: "white" }}></ClearIcon>
                </IconButton>
                <Typography sx={{ color: "white" }} variant="h5">
                  Settings
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{width: '100%', height: '100%', padding: '15px'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px'}}>
              <Typography>
                Transparent Logo Background
              </Typography>
              <Switch onChange={transparentLogoChange} defaultChecked={settings.logoBackground}>

              </Switch>
            </Box>
            <Divider></Divider>
          </Box>

          <Box>
            <Box
              sx={{
                padding: "15px",
                display: "flex",
                gap: "5px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="error"
                fullWidth
                // onClick={handleClearAndCloseCart}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={saveSettings}
              >
                Save Settings
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
