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
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";

export default function AddProject(props) {
  const { open, onClose, userId } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();

  const inputFile = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Item name is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.string().required("price is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const data = await projectsApi.createProject(values, imageFile);
        dispatch(fetchProjects(userId));
        onClose();
        formik.resetForm()
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
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {image ? (
              <Badge
                badgeContent={
                  <IconButton onClick={() => removeImage()}>
                    {" "}
                    <Cancel />{" "}
                  </IconButton>
                }
              >
                <img
                  src={image}
                  alt=""
                  width={180}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenFieExplorer}
                ></img>
              </Badge>
            ) : (
              <img
                src={"/add-image.png"}
                alt=""
                width={180}
                style={{ cursor: "pointer" }}
                onClick={handleOpenFieExplorer}
              ></img>
            )}
          </Box>
          <TextField
            fullWidth
            label="Item Name"
            name="name"
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          ></TextField>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            error={Boolean(formik.touched.price && formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.price}
          ></TextField>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            name="quantity"
            error={Boolean(formik.touched.quantity && formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.quantity}
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
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept=".png, .jpg, .jpeg"
        onChange={handleImageChange}
      />
    </Dialog>
  );
}
