import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getInitials } from "@/utils/constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import {
  removeFromCart,
  addQuantity,
  subtractQuantity,
  addDiscount,
} from "@/slices/cart";
import { useDispatch } from "react-redux";
import EmptyCart from "./empy-cart";
import { clearCart } from "@/slices/cart";
import CheckOut from "./checkout";
import SaleComplete from "./sale-complete";

// const items = [
//   {
//     name: "soda",
//     quantity: 2,
//     price: 100,
//   },
//   {
//     name: "bread",
//     quantity: 5,
//     price: 80,
//   },
//   {
//     name: "water",
//     quantity: 1,
//     price: 50,
//   },
// ];

export default function Cart(props) {
  const { open, setOpen, items, discount } = props;
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openSaleComplete, setOpenSaleComplete] = useState(false);
  const [discountError, setDiscountError] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const getTotal = () => {
    return getSubTotal() - discount;
  };

  const getSubTotal = () => {
    let total = 0;
    items.map((item) => {
      total += item.quantity * item.price;
    });
    return total
  };

  const addItemQuantity = (item) => {
    dispatch(addQuantity(item));
  };

  const setDiscount = (discount) => {
    if (discount > getSubTotal()) {
      setDiscountError(true);
      return;
    } else {
      setDiscountError(false);
      dispatch(addDiscount(discount));
    }
  };

  const subtractItemQuantity = (item) => {
    dispatch(subtractQuantity(item));
  };

  const handleClearAndCloseCart = () => {
    dispatch(clearCart());
    setOpen(false);
  };

  const handleOpenCheckout = () => {
    setOpenCheckout(true);
  };

  return (
    <>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 450,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
          role="presentation"
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "primary.main",
                width: "100%",
                padding: "25px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconButton sx={{ color: "white" }} onClick={handleClose}>
                  <ClearIcon sx={{ color: "white" }}></ClearIcon>
                </IconButton>
                <Typography sx={{ color: "white" }} variant="h5">
                  Cart
                </Typography>
              </Box>
            </Box>

            {items.length > 0 ? (
              <Box>
                {items.map((item) => {
                  const bufferData = item?.imageFile?.buffer;
                  const base64String = bufferData
                    ? bufferData.toString("base64")
                    : null;

                  return (
                    <Paper
                      elevation={24}
                      sx={{
                        marginX: "7px",
                        marginY: "15px",
                        backgroundColor: "#f7dae7",
                        // borderRadius: "2ch",
                      }}
                      key={item.id}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingX: "15px",
                          paddingY: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            sx={{ width: "100px", height: "70px" }}
                          >
                            {!item.imageFile ? (
                              getInitials(item?.name)
                            ) : (
                              <img
                                src={`data:image/jpeg;base64, ${base64String}`}
                                alt="Red Dot"
                                width={"100%"}
                              />
                            )}
                          </Avatar>
                          <Typography
                            // maxWidth={'120px'}
                            // overflow={"ellipsis"}
                            variant="subtitle1"
                            fontWeight={"bold"}
                          >
                            {item?.name}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle2">{`Kes. ${item?.price}`}</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <IconButton
                            onClick={() => subtractItemQuantity(item)}
                          >
                            <RemoveIcon fontSize="small"></RemoveIcon>
                          </IconButton>
                          <Typography variant="subtitle2" fontWeight={"bold"}>
                            {item?.quantity}
                          </Typography>
                          <IconButton onClick={() => addItemQuantity(item)}>
                            <AddIcon fontSize="small"></AddIcon>
                          </IconButton>
                        </Box>
                        <IconButton onClick={() => handleRemoveFromCart(item)}>
                          <ClearIcon></ClearIcon>
                        </IconButton>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            ) : (
              <EmptyCart></EmptyCart>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                paddingY: "15px",
                paddingX: "25px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={"bold"}>
                Discount
              </Typography>
              <TextField
                label="Discount Amount"
                type="number"
                onChange={(e) => setDiscount(e.target.value)}
                error={discountError}
                helperText={
                  discountError ? "discount cannot exceed total" : null
                }
              ></TextField>
            </Box>
            <Divider />
            <Box
              sx={{
                paddingY: "15px",
                paddingX: "25px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight={"bold"}>
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight={"bold"}>
                {`Kes. ${getTotal()}`}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "15px",
                display: "flex",
                gap: "5px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleClearAndCloseCart}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleOpenCheckout}
                disabled={items.length < 1 || discountError}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <CheckOut
        {...{
          open: openCheckout,
          setOpen: setOpenCheckout,
          items,
          getSubTotal,
          getTotal,
          discount,
          setOpenSaleComplete,
          handleClearAndCloseCart,
        }}
      />
      <SaleComplete
        {...{
          open: openSaleComplete,
          onClose: () => setOpenSaleComplete(false),
        }}
      ></SaleComplete>
    </>
  );
}
