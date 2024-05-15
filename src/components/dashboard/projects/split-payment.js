import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  Checkbox,
  TextField,
} from "@mui/material";

const paymentMethods = [
  {
    id: 0,
    name: "Cash",
  },
  {
    id: 1,
    name: "Mpesa",
  },
  {
    id: 2,
    name: "Other",
  },
  {
    id: 3,
    name: "Pay Later",
  },
];

export default function SplitPayment(props) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>SplitPayment</DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <Box>
          {paymentMethods.map((method) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox></Checkbox>
                  <Typography>{method?.name}</Typography>
                </Box>
                <TextField />
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
