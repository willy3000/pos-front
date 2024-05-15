import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Cancel } from "@mui/icons-material";

export default function ContactInfo(props) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>
        <Box sx={{display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography>Contact Us</Typography>
          <IconButton onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "20px",
          }}
        >
          <EmailIcon></EmailIcon>
          <Typography>willywario0@gmail.com</Typography>
        </Box>
        <Divider></Divider>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "20px",
          }}
        >
          <PhoneEnabledIcon></PhoneEnabledIcon>
          <Typography>+254 114653949</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
