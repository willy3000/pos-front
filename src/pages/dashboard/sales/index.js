import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Box, Grid, Typography, Chip } from "@mui/material";
import SalesTable from "@/components/dashboard/sales/sales-table";
import { fetchSales } from "@/slices/sales";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const applyFilters = (sales, paymentMethod) => {
  if (paymentMethod === "All") {
    return sales;
  }
  if (sales) {
    return sales.filter((sale) => sale.paymentMethod === paymentMethod);
  }
  return [];
};

export default function Sales() {
  const { sales } = useSelector(({ sales }) => sales);
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const getSales = async () => {
    try {
      dispatch(fetchSales());
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRadioChange = (e) => {
    setPage(0)
    setPaymentMethod(e.target.value);
  };

  const getSalesTotal = () => {
    let total = 0;
    filteredSales.map((sale) => {
      total += sale.total;
    });
    return total;
  };

  const filteredSales = applyFilters(sales, paymentMethod);

  useEffect(() => {
    getSales();
  }, []);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Sales</Typography>
          </Grid>
          <Grid item>
            {/* <Button variant="outlined" onClick={() => setOpen(true)}>
              Add Item
            </Button> */}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <Box>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={paymentMethod}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
              <FormControlLabel
                value="Mpesa"
                control={<Radio />}
                label="Mpesa"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>
          <Chip label={`Total: ${getSalesTotal().toLocaleString()}`}></Chip>
        </Box>
      </Box>
      <SalesTable {...{ sales: filteredSales, page, setPage }} />
    </DashboardNavbar>
  );
}
