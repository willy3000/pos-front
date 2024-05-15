import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  Avatar,
  Badge,
  IconButton,
  Collapse,
  Divider,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableFooter,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { paymentsApi } from "@/api/Payments";
import { Add, Remove } from "@mui/icons-material";
import { SUBSCRIPTION_PRICE } from "@/utils/constants";

export default function ConfirmSubscription(props) {
  const { open, onClose, months } = props;

  const handlePaymentComplete = async () => {
    const data = await paymentsApi.generatePaymentCode();
  };

  const addMonth = () => {
    setMonths(months + 1);
  };

  const removeMonth = () => {
    if (months > 1) {
      setMonths(months - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="title">Confirm Subscription</Typography>
          <IconButton onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <Typography>Duration</Typography>
          <Typography>{`${months} month(s)`}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <Typography>Price per month</Typography>
          <Typography>{SUBSCRIPTION_PRICE.toLocaleString()}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <Typography fontWeight={'bold'}>Total</Typography>
          <Typography fontWeight={'bold'}>{(SUBSCRIPTION_PRICE * months).toLocaleString()}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentComplete}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
