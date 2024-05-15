import React from "react";
import {
  Box,
  Paper,
  Typography,
  Card,
  Grid,
  Divider,
  Chip,
} from "@mui/material";

export default function DashboardData(props) {
  const { summary } = props;

  return (
    <>
      <Divider>
        <Chip label="Summary" />
      </Divider>
      <Grid container>
        {summary.map((record) => {
          return (
            <Grid xs={12} sm={12} md={6} lg={4} key={record.id}>
              <Paper
                elevation={24}
                sx={{ padding: "5px", margin: "10px", borderRadius: "2ch" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="title"
                    sx={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    {record.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "50px", fontWeight: "bold" }}
                  >
                    {record.number}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {/* <Divider sx={{marginTop: '85px'}}>
        <Chip label="Most Sold Today" />
      </Divider>
      <Grid container>
        {summary.map((record) => {
          return (
            <Grid xs={12} sm={12} md={6} lg={4}>
              <Paper
                elevation={24}
                sx={{ padding: "5px", margin: "10px", borderRadius: "2ch" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="title"
                    sx={{ fontWeight: "bold", fontSize: "25px" }}
                  >
                    {record.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "50px", fontWeight: "bold" }}
                  >
                    {record.number}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid> */}
    </>
  );
}
