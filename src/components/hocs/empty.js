import React from "react";
import { Box } from "@mui/material";

export default function Empty() {
  return (
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img src="/empty-cart.png" alt="no items" width={'50%'}/>
      </Box>
    </>
  );
}
