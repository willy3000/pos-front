import React, {useState, useEffect} from "react";
import { Dialog, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const top = "top";
const center = "left";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function BetaToast(props) {
  const {open, toastMessage, toastType} = props;
  const [toastOpen, setToastOpen] = useState(false)


  useEffect(() => {
    setToastOpen(open)
  }, [])


  const onClose = () => {
    setToastOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={toastOpen}
      autoHideDuration={3000}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity={toastType} sx={{ width: "100%" }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}
