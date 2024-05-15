import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "@/slices/reports";
import ReportsTable from "@/components/dashboard/reports/reports-table";

export default function Items() {
  const { reports } = useSelector(({reports}) => reports);


  const dispatch = useDispatch();

  const getReports = async () => {
    try {
      dispatch(fetchReport());
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("reports in main", reports);

  useEffect(() => {
    getReports();
  }, []);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingY: "15px", width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Reports</Typography>
          </Grid>
          <Grid item>
            {/* <Button variant="outlined" onClick={() => setOpen(true)}>
              Add Item
            </Button> */}
          </Grid>
        </Grid>
      </Box>
      <ReportsTable {...{ reports }} />
    </DashboardNavbar>
  );
}
