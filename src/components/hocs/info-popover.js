import React from "react";
import { Popover, Box, Typography } from "@mui/material";

export default function InfoPopover(props) {
  const { id = 1, anchorEl, setAnchorEl, content } = props;
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: "2ch",
          maxWidth: "50%",
          overflowWrap: "break-word",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#2B2B2B",
          opacity: ".8",
          maxWidth: "80%",
          borderRadius: "2ch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::before": {
              backgroundColor: "#2B2B2B",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              top: -6,
              transform: "rotate(45deg)",
              left: "4%",
              borderRadius: .6,
            },
          }}
        />
        <Typography
          sx={{
            p: 2,
            backgroundColor: "#2B2B2B",
            color: "white",
            fontSize: "small",
            borderRadius: "2ch",
          }}
        >
          {content}
        </Typography>
      </Box>
    </Popover>
  );
}
