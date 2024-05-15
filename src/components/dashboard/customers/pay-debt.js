import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";

export default function PayDebt(props) {
  const { open, onClose, customer } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"md"}>
      <DialogTitle>PayDebt</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <Typography>{customer?.name}</Typography>
          <Typography>{`Balance: ${customer?.bill}`}</Typography>
        </Box>
        <Box sx={{ padding: "15px" }}>
          <TextField label="amount paid" fullWidth></TextField>
        </Box>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Add Payment</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
