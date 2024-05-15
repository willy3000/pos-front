import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  Autocomplete,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";


// const userEmails = [
//   "willywario@gmail.com",
//   "ibrahm@gmai.com",
//   "godo@gmail.com",
//   "zack@gmail.com",
// ];

export default function AddParticipant(props) {
  const { open, onClose, userId, projectId, userEmails, getParticipants } = props;
  const [matchedEmailList, setMatchedEmailList] = useState([]);
  const [openConfimationDialog, setOpenConfirmationDialog] = useState(false);

  const dispatch = useDispatch();



  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Project name is required"),
    }),

    onSubmit: async (values, helpers) => {
      setOpenConfirmationDialog(true);
    },
  });

  const handleChange = (value) => {
    console.log("value", value);
    let matchedEmails = [];
    formik.setFieldValue("email", value);
    if (value !== "") {
      matchedEmails = userEmails.filter((email) =>
        email.split("@")[0].includes(value)
      );
    }
    setMatchedEmailList(matchedEmails);
    // console.log(matchedEmails)
  };

  const onCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleConfirm = async () => {
    try {
      const data = await projectsApi.addParticipant(
        formik.values.email,
        projectId
      );
      getParticipants()
      onCloseConfirmationDialog()
      onClose()
    } catch (err) {
      console.log(err.message);
    }
  };

  const getConfirmationMessage = () => {
    return `An email will be sent to ${formik.values.email} to join your project`;
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle sx={{ backgroundColor: "primary.main" }}>
          <Typography variant="title" color={"white"}>
            Add Participant
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
            <Autocomplete
              fullWidth
              freeSolo
              label="Search Participant Email"
              name="email"
              disablePortal
              id="combo-box-demo"
              options={matchedEmailList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by Email"
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={(e, value) => handleChange(value)}
              value={formik.values.email}
            />
            <DialogActions>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onClose}
              >
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
      <ConfirmationDialog
        {...{
          open: openConfimationDialog,
          onClose: onCloseConfirmationDialog,
          onOk: handleConfirm,
          confirmationMessage: getConfirmationMessage(),
        }}
      />
    </>
  );
}
