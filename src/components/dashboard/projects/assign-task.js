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
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";

export default function AssignTask(props) {
  const { open, onClose, userId, participant } = props;
  const [openConfimationDialog, setOpenConfirmationDialog] = useState(false)

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
    }),

    onSubmit: async (values, helpers) => {
        setOpenConfirmationDialog(true)
    },
  });

  const onCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false)
  }

  const getConfirmationMessage = () => {
    return `Assign this task to ${participant?.firstName} ${participant?.lastName}`
  }

  const handleConfirm = () => {

  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="title" color={"white"}>
          Assign Task
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
          onSubmit = {formik.handleSubmit}
        >
          <TextField
            fullWidth
            label="Task Name"
            name="projectName"
            error={Boolean(
              formik.touched.projectName && formik.errors.projectName
            )}
            helperText={formik.touched.projectName && formik.errors.projectName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.projectName}
          ></TextField>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows="3"
            name="description"
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={formik.touched.description && formik.errors.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></TextField>
          <DialogActions>
            <Button variant="outlined" startIcon={<Cancel />} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<CheckCircle />} type='submit'>
              Assign
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
      <ConfirmationDialog
        {...{
          open: openConfimationDialog,
          onClose: onCloseConfirmationDialog,
          onOk: handleConfirm,
          confirmationMessage: getConfirmationMessage(),
        }}
      />
    </Dialog>
  );
}
