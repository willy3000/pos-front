import React, { useState } from "react";
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { getBillColor } from "@/utils/constants";
import PayDebt from "./pay-debt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function CustomersTable(props) {
  const { customers } = props;
  const [customer, setCustomer] = useState(null);
  const [openPayDebt, setOpenPayDebt] = useState(false);

  const onClosePayDebt = () => {
    setOpenPayDebt(false);
  };

  const handleOpenPayDebt = (customer) => {
    setCustomer(customer);
    setOpenPayDebt(true);
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Bill Due</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customer) => {
            return (
              <TableRow>
                <TableCell>{customer?.name}</TableCell>
                <TableCell>{customer?.phoneNumber}</TableCell>
                <TableCell>
                  <Typography
                    color={getBillColor(customer?.bill)}
                    fontWeight={"bold"}
                  >
                    {customer?.bill}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenPayDebt(customer)}>
                    <AccountBalanceWalletIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PayDebt {...{ open: openPayDebt, onClose: onClosePayDebt, customer }} />
    </Card>
  );
}
