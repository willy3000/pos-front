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

export default function EditItem(props) {
  const { item, open, onClose, userId } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();

  const inputFile = useRef();

  const handleCloseAndReset = () => {
    onClose();
    formik.resetForm();
    getBase64String();
    setImage(null);
    setImageFile(null);
    setImageChanged(false)
  };

  const formik = useFormik({
    initialValues: {
      id: item?.id,
      name: item?.name,
      quantity: item?.quantity,
      price: item?.price,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Item name is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.string().required("price is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const data = await projectsApi.editItem(values, imageFile, imageChanged)
        await dispatch(fetchProjects(userId));
        onClose();
        formik.resetForm();
        setImage(null);
        setImageFile(null);
        setBase64String(null);
        setImageChanged(false)
      } catch (err) {
        console.log(err);
      }
    },
  });

  // console.log(item?.imageFile)

  const getBase64String = () => {
    const bufferData = item?.imageFile?.buffer;
    const base64String = bufferData ? bufferData.toString("base64") : null;
    console.log("string bas64", base64String);
    setBase64String(base64String);
  };

  const handleOpenFieExplorer = () => {
    inputFile.current.click();
  };

  const handleImageChange = (e) => {
    setImageChanged(true);
    setImageFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    // console.log(e.target.files[0]);
    // console.log(url);
    setImage(url);
  };

  console.log(imageFile)

  const removeImage = () => {
    setImageChanged(true);
    setImage(null);
    setImageFile(null);
    setBase64String(null);
  };

  useEffect(() => {
    getBase64String();
  }, [item]);

  return (
    <Dialog open={open} onClose={handleCloseAndReset} fullWidth>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="title" color={"white"}>
          Edit Item
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
                  // src={`data:image/jpeg;base64, ${base64String}`}
                  src={image}
                  alt=""
                  width={180}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenFieExplorer}
                ></img>
              </Badge>
            ) : base64String ? (
              <Badge
                badgeContent={
                  <IconButton onClick={() => removeImage()}>
                    {" "}
                    <Cancel />{" "}
                  </IconButton>
                }
              >
                <img
                  src={`data:image/jpeg;base64, ${base64String}`}
                  // src={image}
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
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCloseAndReset}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              type="submit"
            >
              Update
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
