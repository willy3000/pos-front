import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyCart() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <img src="/empty-cart.png" alt="" width={350} />
        <Typography sx={{fontSize: '20px', fontWeight: 'bold', color: '#a4a5a6'}}>Cart Empty</Typography>
      </Box>
    </Box>
  );
}
