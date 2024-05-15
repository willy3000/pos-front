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
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { projectsApi } from "@/api/Projects";
import { fetchProjects } from "@/slices/projects";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "@/components/hocs/confirmation-dialog";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment/moment";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function AddEvent(props) {
  const { open, onClose, userId, participant, projectId, getProjectEvents } = props;
  const [openConfimationDialog, setOpenConfirmationDialog] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      eventName: "",
      description: "",
      eventDate: new Date(),
      eventTime: '',
      addedBy: userId,
      projectId: projectId,
      link: "",
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Project name is required"),
      description: Yup.string().required("Description is required"),
      eventDate: Yup.string().required("Event date is required"),
    }),

    onSubmit: async (values, helpers) => {
      //   setOpenConfirmationDialog(true);
      const data = await projectsApi.addEvent(projectId, userId, values);
      getProjectEvents()
      console.log(values);
      console.log(data);
    },
  });

  const onCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const getConfirmationMessage = () => {
    return `Assign this task to ${participant?.firstName} ${participant?.lastName}`;
  };

  const closeAndReset = () => {
    onClose();
    formik.resetForm();
  };

  const pasteLink = async () => {
    navigator.clipboard.readText().then((text) => {
      formik.setFieldValue("link", text.trim());
    });
    // const text = window.clipboardData.getData("Text");
    // console.log(text);
  };

  const clearLink = () => {
    formik.setFieldValue("link", "");
  };

  // const handleEventDateChange = (value) => {
  //   formik.setFieldValue("eventDate", value);
  //   console.log(value);
  // };

  const handleConfirm = () => {};

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        <Typography variant="title" color={"white"}>
          Assign Event
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
            label="Event Name"
            name="eventName"
            error={Boolean(formik.touched.eventName && formik.errors.eventName)}
            helperText={formik.touched.eventName && formik.errors.eventName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.eventName}
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Date"
              onChange={(date) => formik.setFieldValue("eventDate", date)}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              value={formik.values.invoiceDate}
            />
            <MobileTimePicker
              label={'Time'}
              views={["hours", "minutes"]}
              onChange={(time) => formik.setFieldValue("eventTime", time)}
            />
            {/* <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Invoice Date"
              onChange={(date) => formik.setFieldValue("eventDate", date)}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              value={formik.values.invoiceDate}
            /> */}
          </LocalizationProvider>

          <TextField
            fullWidth
            multiline
            label="Description"
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
          <TextField
            fullWidth
            label="add meeting link (oprional)"
            // placeholder="optional"
            name="link"
            error={Boolean(formik.touched.link && formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.link}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <Tooltip
                    title={
                      formik.values.link === ""
                        ? "paste meeting link"
                        : "remove link"
                    }
                  >
                    <IconButton
                      onClick={
                        formik.values.link === "" ? pasteLink : clearLink
                      }
                    >
                      {" "}
                      {formik.values.link === "" ? (
                        <ContentPasteIcon></ContentPasteIcon>
                      ) : (
                        <ClearIcon></ClearIcon>
                      )}
                    </IconButton>
                  </Tooltip>{" "}
                </InputAdornment>
              ),
            }}
          ></TextField>
          <DialogActions>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={closeAndReset}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              type="submit"
            >
              Create
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
