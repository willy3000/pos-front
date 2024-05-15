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
  Avatar,
  Badge,
  IconButton,
  Collapse,
  InputAdornment,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import { customersApi } from "@/api/Customers";
import { fetchCustomers } from "@/slices/customers";

export default function AddCustomer(props) {
  const { open, onClose } = props;

  const dispatch = useDispatch();

  const inputFile = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Item name is required"),
      phoneNumber: Yup.string(),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const data = await customersApi.addCustomer(values);
        dispatch(fetchCustomers());
        onClose();
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleOpenFieExplorer = () => {
    inputFile.current.click();
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(url);
    setImage(url);
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="title" color={"white"}>
          Item Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "25px",
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            label="Customer Name"
            placeholder=" e.g. John Doe"
            name="name"
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          ></TextField>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="e.g. 712345678"
            name="phoneNumber"
            type="number"
            error={Boolean(
              formik.touched.phoneNumber && formik.errors.phoneNumber
            )}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextField
                    variant="standard"
                    value="+254"
                    disabled
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <DialogActions>
            <Button variant="outlined" startIcon={<Cancel />} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              type="submit"
            >
              Add
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
