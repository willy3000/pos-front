import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Typography, Button, Box, Grid } from "@mui/material";
// import { FormatColorReset } from "@mui/icons-material";
import DashboardData from "@/components/dashboard/dashboard-data";
import { dashboardApi } from "@/api/Dashboard";

export default function MyProjects() {
  const [summary, setSummary] = useState([]);

  const getSummary = async () => {
    try {
      const data = await dashboardApi.getSummary();
      setSummary(data)
    } catch (err) {}
  };

  useEffect(() => {
    getSummary();
  }, []);

  // useEffect(() => {
  //   router.push("/dashboard/projects");
  // }, []);

  return (
    <DashboardNavbar>
      <Box sx={{ paddingX: "15px" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
      <DashboardData {...{ summary }} />
      <Box></Box>
    </DashboardNavbar>
  );
}
