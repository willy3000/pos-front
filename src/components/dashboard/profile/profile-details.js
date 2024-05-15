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
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ReplayIcon from "@mui/icons-material/Replay";
import { updateUserDetails } from "../../../slices/user";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Toast from "@/components/hocs/toast";

export default function ProfileDetails(props) {
  const { open, onClose, user } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const handleCloseToast = () => {
    setToastDetails({ ...toastDetails, open: false });
  };

  const [toastDetails, setToastDetails] = useState({
    open: false,
    onClose: handleCloseToast,
    toastType: "success",
    toastMessage: "",
  });

  const showToast = (type, message) => {
    setToastDetails({
      open: true,
      onClose: handleCloseToast,
      toastType: type,
      toastMessage: message,
    });
  };

  const dispatch = useDispatch();

  const inputFile = useRef();

  const handleCloseAndReset = () => {
    onClose();
    formik.resetForm();
    getBase64String();
    setImage(null);
    setImageFile(null);
    setImageChanged(false);
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      businessname: user?.businessname,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required(),
      businessname: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(updateUserDetails(values, imageFile, imageChanged));
        setImage(null);
        setImageFile(null);
        setImageChanged(false);
        showToast("success", "Profile Updated");
      } catch (err) {}
    },
  });

  /////
  const getBase64String = () => {
    const bufferData = user?.logo?.buffer;
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

  console.log(imageFile);

  const removeImage = () => {
    setImageChanged(true);
    setImage(null);
    setImageFile(null);
    setBase64String(null);
    inputFile.current.value = null
  };

  const resetDetails = () => {
    formik.resetForm();
    getBase64String();
    setImage(null);
    setImageFile(null);
    setImageChanged(false);
  };

  useEffect(() => {
    getBase64String();
  }, [user]);

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          //   padding: "10px",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "15px",
          }}
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
              <Avatar sx={{ width: "180px", height: "180px" }}>
                <img
                  // src={`data:image/jpeg;base64, ${base64String}`}
                  src={image}
                  alt=""
                  width={180}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenFieExplorer}
                ></img>
              </Avatar>
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
              <Avatar sx={{ width: "180px", height: "180px" }}>
                <img
                  src={`data:image/jpeg;base64, ${base64String}`}
                  // src={image}
                  alt=""
                  width={180}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenFieExplorer}
                ></img>
              </Avatar>
            </Badge>
          ) : (
            <Badge
              badgeContent={
                <IconButton onClick={handleOpenFieExplorer}>
                  <AddCircleIcon></AddCircleIcon>
                </IconButton>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {base64String ? (
                <Avatar sx={{ width: "180px", height: "180px" }}>
                  <img
                    src={`data:image/jpeg;base64, ${base64String}`}
                    alt=""
                    width={"100%"}
                  />
                </Avatar>
              ) : (
                <Avatar sx={{ width: "180px", height: "180px" }}></Avatar>
              )}
            </Badge>
          )}
        </Box>
        <TextField
          sx={{ width: "80%" }}
          label="Username"
          name="username"
          error={Boolean(formik.touched.username && formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        ></TextField>
        <TextField
          sx={{ width: "80%" }}
          label="Business Name"
          name="businessname"
          error={Boolean(
            formik.touched.businessname && formik.errors.businessname
          )}
          helperText={formik.touched.businessname && formik.errors.businessname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.businessname}
        ></TextField>

        <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={resetDetails}
          >
            Reset{" "}
          </Button>
          <Button variant="contained" startIcon={<CheckCircle />} type="submit">
            Update
          </Button>
        </Box>
      </Box>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept=".png, .jpg, .jpeg"
        onChange={handleImageChange}
      />
      <Toast {...{ ...toastDetails }}></Toast>
    </>
  );
}
