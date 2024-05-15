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

export default function MakePayment(props) {
  const { open, onClose } = props;

  const handlePaymentComplete = async () => {
    const data = await paymentsApi.generatePaymentCode()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="title">Make Payment</Typography>
          <IconButton onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <Typography variant="h5"  sx={{textDecoration: 'underline', fontWeight:"bold"}}>
            INSTRUCTIONS
          </Typography>
          <Typography fontWeight="bold">1. Go to M-Pesa</Typography>
          <Typography fontWeight="bold">
            2. Pay Kes.1, 999 to 0114653949
          </Typography>
          <Typography fontWeight="bold">
            3. Upon confirmation, click GENERATE CODE
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handlePaymentComplete}>
          Generate Code
        </Button>
      </DialogActions>
    </Dialog>
  );
}
