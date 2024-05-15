import React, { useState } from "react";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  Button,
  ButtonGroup,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Add } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import CustomersList from "../customers/customers-list";
import { fetchCustomers } from "@/slices/customers";
import { Cancel } from "@mui/icons-material";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import SplitPayment from "./split-payment";

export default function CheckOut(props) {
  const {
    open,
    setOpen,
    setOpenSaleComplete,
    items,
    getTotal,
    getSubTotal,
    discount,
    handleClearAndCloseCart,
    userId,
  } = props;

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [openCustomersList, setOpenCustomersList] = useState(false);

  const [customer, setCustomer] = useState(null);

  const [openSplitPayment, setOpenSplitPayment] = useState(false)

  const dispatch = useDispatch();

  const onCloseCustomersList = () => {
    setOpenCustomersList(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const onCloseSplitPayment = () => {
    setOpenSplitPayment(false)
  }

  const handleCompleteSale = async () => {
    const newItems = [];
    items.map((item) => {
      newItems.push({ ...item, imageFile: null });
    });
    const values = {
      items: [...newItems],
      date: new Date(),
      subTotal: getSubTotal(),
      paymentMethod: paymentMethod,
      discount: discount,
      total: getTotal(),
      customer: customer.id,
    };
    try {
      const data = await projectsApi.makeSale(values);
      console.log(data);
      if (data.success) {
        setOpen(false);
        setPaymentMethod("Cash");
        setCustomer(null);
        setOpenSaleComplete(true);
        handleClearAndCloseCart();
        dispatch(fetchProjects());
        dispatch(fetchCustomers());
      } else {
      }
    } catch (err) {}
  };

  const handleSetPaymentMethod = (method) => {
    if (method === "Pay Later") {
      setOpenCustomersList(true);
    }
    setPaymentMethod(method);
  };

  const handleRemoveCustomer = () => {
    setCustomer(null);
    setPaymentMethod("Cash");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
        <Typography variant="h5">Checkout</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ paddingY: "10px", width: "100%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" color="white">
                  Item
                </StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Price per Unit</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              {items.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography align="left">{item.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{`x${item.quantity}`}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{item.price}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>{item.quantity * item.price}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Typography fontWeight={"bold"}>Total:</Typography>
            <Typography fontWeight={"bold"}>{`Kes. ${getTotal()}`}</Typography>
          </Box>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <ButtonGroup fullWidth>
              <Button
                color="warning"
                onClick={() => handleSetPaymentMethod("Cash")}
                variant={paymentMethod === "Cash" ? "contained" : "outlined"}
              >
                Cash
              </Button>
              <Button
                color="success"
                onClick={() => handleSetPaymentMethod("Mpesa")}
                variant={paymentMethod === "Mpesa" ? "contained" : "outlined"}
              >
                Mpesa
              </Button>
              <Button
                color="info"
                onClick={() => handleSetPaymentMethod("Other")}
                variant={paymentMethod === "Other" ? "contained" : "outlined"}
              >
                Other
              </Button>
              <Button
                color="secondary"
                onClick={() => handleSetPaymentMethod("Pay Later")}
                variant={
                  paymentMethod === "Pay Later" ? "contained" : "outlined"
                }
              >
                Pay Later
              </Button>
            </ButtonGroup>
            <Tooltip title="split payment">
              <Button variant="outlined" onClick={() => setOpenSplitPayment(true)}>
                <CallSplitIcon />
              </Button>
            </Tooltip>
          </Box>
          {customer ? (
            <Box
              sx={{
                paddingTop: "45px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Badge
                badgeContent={
                  <IconButton onClick={handleRemoveCustomer}>
                    <Cancel></Cancel>
                  </IconButton>
                }
              >
                <Paper
                  elevation={12}
                  sx={{
                    padding: "15px",
                    borderRadius: "3ch",
                    fontWeight: "bold",
                  }}
                >
                  {customer?.name}
                </Paper>
              </Badge>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCompleteSale}>
          Complete
        </Button>
      </DialogActions>
      <CustomersList
        {...{
          open: openCustomersList,
          onClose: onCloseCustomersList,
          setCustomer,
        }}
      />
      <SplitPayment {...{open: openSplitPayment, onClose: onCloseSplitPayment}}/>
    </Dialog>
  );
}
