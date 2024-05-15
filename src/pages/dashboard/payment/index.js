import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
// import { FormatColorReset } from "@mui/icons-material";
import Empty from "@/components/hocs/empty";
import AuthGuard from "@/components/hocs/auth-guard";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "@/components/dashboard/projects/project-list";
import { fetchProjects } from "@/slices/projects";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "@/components/dashboard/projects/cart";
import LoadingAnimation from "@/components/hocs/loading-animation";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AddCardIcon from "@mui/icons-material/AddCard";
import Activate from "@/components/dashboard/payment/activate";
import MakePayment from "@/components/dashboard/payment/make-payment";
import { fetchPayments } from "@/slices/payments";
import PaymentHistoryTable from "@/components/dashboard/payment/payment-history-table";
import InfoIcon from "@mui/icons-material/Info";
import GenerateSubscription from "@/components/dashboard/payment/generate-subscription";

const applyFilters = (projects, filters) => {
  if (projects) {
    if (filters.name) {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    return projects;
  }
  return projects;
};

export default function Payments() {
  const [open, setOpen] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const { payments } = useSelector(({ payments }) => payments);

  const dispatch = useDispatch();

  const getPayments = async () => {
    try {
      await dispatch(fetchPayments());
    } catch (err) {}
  };

  const [filters, setFilters] = useState({
    name: null,
  });

  const onClose = () => {
    setOpen(false);
  };

  const onClosePay = () => {
    setOpenPay(false);
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <Typography variant="h4">Payment</Typography>
              <IconButton size='small'>
                <InfoIcon fontSize="small"/>
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenPay(true)}
                startIcon={<AddCardIcon />}
              >
                Generate Subscription
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                startIcon={<VerifiedUserIcon />}
              >
                Activate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PaymentHistoryTable {...{ payments }} />
      <Activate {...{ open, onClose }}></Activate>
      {/* <MakePayment {...{ open: openPay, onClose: onClosePay }}></MakePayment> */}
      <GenerateSubscription {...{ open: openPay, onClose: onClosePay }}></GenerateSubscription>
    </DashboardNavbar>
  );
}
