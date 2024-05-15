import React from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { DangerousOutlined } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";

const ConfirmationDialog = (props) => {
  const { open, onClose, onOk, confirmationMessage, message = "" } = props;

  const handleOnOk = () => {
    onOk();
    onClose();
  };

  return (
    <Dialog open={open} maxWidth={"sm"} fullWidth onClose={onClose}>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <DangerousOutlined
            sx={{ fontSize: "100px" }}
            fontSize={"large"}
            color={"warning"}
            // sx={{ width: "65px", height: "65px" }}
          />
          <Typography variant={"h6"} gutterBottom fontWeight={"bold"}>
            WARNING!
          </Typography>
          <Typography variant={"subtitle1"} fontWeight={"bold"}>
            {confirmationMessage}
          </Typography>
          {message && (
            <Box
              sx={{
                display: "flex",
                border: "solid 1px red",
                alignItems: "center",
                gap: "5px",
                padding: "10px",
                margin: "10px",
              }}
            >
              <WarningIcon color="error" />
              <Typography fontWeight={"bold"}>{message}</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", mt: 2 }}>
            <Button
              sx={{ mr: 2 }}
              color={"primary"}
              variant={"contained"}
              onClick={handleOnOk}
            >
              Proceed
            </Button>
            <Button
              sx={{ mr: 2 }}
              color={"error"}
              variant={"outlined"}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
