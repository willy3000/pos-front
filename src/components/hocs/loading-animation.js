import React from "react";
import { Audio, ThreeDots, MagnifyingGlass, Radio } from "react-loader-spinner";
import { Box } from "@mui/material";

export default function LoadingAnimation(props) {
  const { loading } = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <ThreeDots
        height="80"
        width="150"
        radius="8"
        color="#f995c1"
        ariaLabel="three-dots-loading"
        visible={loading}
      />
    </Box>
  );
}
