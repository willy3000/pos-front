import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getBillColor } from "@/utils/constants";

export default function CustomersList(props) {
  const { open, onClose, setCustomer } = props;
  const { customers } = useSelector(({ customers }) => customers);

  const handleSelectCustomer = (customer) => {
    setCustomer(customer);
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"md"}>
      <DialogTitle>
        <Typography>Select Customer</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box>
          <List>
            {customers.map((customer) => {
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleSelectCustomer(customer)}>
                      <ListItemText primary={customer?.name}/>
                      <Typography
                        fontWeight={"bold"}
                        color={getBillColor(customer?.bill)}
                      >
                        {customer?.bill}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
