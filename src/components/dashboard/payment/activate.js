import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  IconButton,
  Divider,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContentPaste } from "@mui/icons-material";

export default function Activate(props) {
  const { open, onClose, code = null } = props;

  const formik = useFormik({
    initialValues: {
      activationKey: "",
      code: code ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      activationKey: Yup.string().required("Activation key is required"),
    }),
    onSubmit: (values) => {
      console.log(values.activationKey);
    },
  });

  const handleCloseAndReset = () => {
    formik.resetForm();
    onClose();
  };

  const pasteCode = async () => {
    navigator.clipboard.readText().then((text) => {
      formik.setFieldValue("code", text.trim());
    });
  };

  const pasteKey = async () => {
    navigator.clipboard.readText().then((text) => {
      formik.setFieldValue("activationKey", text.trim());
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="title">Activate</Typography>
          <IconButton onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <TextField
            fullWidth
            label="Code"
            name="code"
            value={formik.values.code}
            error={Boolean(formik.errors.code && formik.touched.code)}
            helperTex={formik.errors.code && formik.touched.code}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="paste code">
                    <IconButton onClick={pasteCode}>
                      <ContentPaste />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            fullWidth
            label="Enter activation key"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            name="activationKey"
            value={formik.values.activationKey}
            error={Boolean(
              formik.errors.activationKey && formik.touched.activationKey
            )}
            helperTex={
              formik.errors.activationKey && formik.touched.activationKey
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="paste code">
                    <IconButton onClick={pasteKey}>
                      <ContentPaste />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleCloseAndReset()}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Activate
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
