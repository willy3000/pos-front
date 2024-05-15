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
  InputAdornment,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import { AddCircle } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ReplayIcon from "@mui/icons-material/Replay";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Auth } from "@/api/Auth";
import Toast from "@/components/hocs/toast";

export default function ChangePassword(props) {
  const { open, onClose, user } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentPassVisible, setCurrentPassVisible] = useState(false);
  const [newPassVisible, setNewPassVisible] = useState(false);

  const handleCloseToast = () => {
    setToastDetails({ ...toastDetails, open: false });
  };

  const [toastDetails, setToastDetails] = useState({
    open: false,
    onClose: handleCloseToast,
    toastType: "",
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

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("current password is required"),
      newPassword: Yup.string().required("new Password is required"),
      confirmPassword: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await Auth.changePassword(values);
        console.log("change password data", data);
        if (data.success) {
          showToast("success", "Password Changed");
        } else {
          showToast("error", data.message);
        }
      } catch (err) {
        showToast("error", err.message);
      }
    },
  });

  const handleOpenFieExplorer = () => {
    inputFile.current.click();
  };

  const toggleCurrentPassVisibility = () => {
    setCurrentPassVisible(!currentPassVisible);
  };

  const toggleNewPassVisibility = () => {
    setNewPassVisible(!newPassVisible);
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

  const handleTabChange = (value) => {
    setTabValue(value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          sx={{ width: "80%" }}
          label="Current Password"
          name="currentPassword"
          type={currentPassVisible ? "text" : "password"}
          error={Boolean(
            formik.touched.currentPassword && formik.errors.currentPassword
          )}
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleCurrentPassVisibility()}>
                  {currentPassVisible ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          sx={{ width: "80%" }}
          label="New Password"
          name="newPassword"
          type={newPassVisible ? "text" : "password"}
          error={Boolean(
            formik.touched.newPassword && formik.errors.newPassword
          )}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleNewPassVisibility()}>
                  {newPassVisible ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          sx={{ width: "80%" }}
          label="Confirm New Password"
          name="confirmPassword"
          type={newPassVisible ? "text" : "password"}
          error={Boolean(
            formik.touched.confirmPassword && formik.errors.confirmPassword
          )}
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleNewPassVisibility()}>
                  {newPassVisible ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>

        <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <Button variant="contained" startIcon={<CheckCircle />} type="submit">
            Change Password
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
      <Toast {...{ ...toastDetails }} />
    </>
  );
}
