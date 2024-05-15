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
import ConfirmSubscription from "./confirm-subscription";
import { SUBSCRIPTION_PRICE } from "@/utils/constants";


export default function GenerateSubscription(props) {
  const { open, onClose } = props;
  const [months, setMonths] = useState(1);
  const [confirmSubscription, setConfirmSubscription] = useState(false)

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

  const onCloseConfirmSubscription = () => {
    setConfirmSubscription(false);
  }

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
          <Typography variant="title">Generate Subscription</Typography>
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
            width: "100%",
            justifyContent: "space-between",
            padding: '15px'
          }}
        >
          <Typography>Subscription Duration(months)</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={removeMonth}>
              <Remove />
            </IconButton>
            <Typography variant="caption" fontWeight={"bold"}>
              {months}
            </Typography>
            <IconButton onClick={addMonth}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Monthly Rate</TableCell>
                <TableCell>No. of Months</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2,000</TableCell>
                <TableCell>{months}</TableCell>
                <TableCell>{SUBSCRIPTION_PRICE * months}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setConfirmSubscription(true)}
        >
          Generate Subscription
        </Button>
      </DialogActions>
      <ConfirmSubscription {...{open: confirmSubscription, onClose: onCloseConfirmSubscription, months: months}}/>
    </Dialog>
  );
}
