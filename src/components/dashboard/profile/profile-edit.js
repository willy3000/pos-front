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
import { AddCircle } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ProfileDetails from "./profile-details";
import ChangePassword from "./change-password";

const tabs = [
  {
    id: 0,
    name: "Details",
  },
  {
    id: 1,
    name: "Change Password",
  },
];

export default function ProfileEdit(props) {
  const { open, onClose, user } = props;
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const dispatch = useDispatch();

  const inputFile = useRef();


  const getContent = () => {
    if(tabValue === 0){
      return (
        <ProfileDetails {...{user}}/>
        )
      }else{
        return (
          <ChangePassword/>
      )
    }
  }


  const formik = useFormik({
    initialValues: {
      username: "",
      businessName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      businessName: Yup.string(),
    }),
    onSubmit: (values) => {},
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

  const handleTabChange = (value) => {
    setTabValue(value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="title" color={"white"}>
            Profile
          </Typography>
          <IconButton onClick={onClose}>
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", justifyContent: "center" }}>
          <Tabs
            value={tabValue}
            onChange={(e, value) => handleTabChange(value)}
            aria-label="basic tabs example"
          >
            {tabs.map((tab, index) => {
              return (
                <Tab
                  icon={index === 0 ? <AccountCircleIcon /> : <VpnKeyIcon />}
                  label={tab.name}
                  value={tab.id}
                  key={tab.id}
                />
              );
            })}
          </Tabs>
          {getContent()}
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
