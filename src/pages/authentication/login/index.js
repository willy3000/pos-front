import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Card,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Box,
  Grid,
  Checkbox,
  TextField,
  Button,
  Avatar,
  Link,
  CssBaseline,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "@/api/Auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { fetchUser } from "../../../slices/user";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Pos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogIn() {
  const navigation = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(4).max(255).required("Password is required"),
    }),

    onSubmit: async (values, helpers) => {
      let loadingToast = toast.loading("Logging you in");
      try {
        const data = await Auth.logIn(values);
        // console.log(data.user)
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(fetchUser(data.user));
        Cookies.set(
          "userInfo",
          JSON.stringify({
            email: "willy@gmail.com",
            id: "1234567890",
            username: "Wario",
            password: "willy",
          }),
          { expires: 1 }
        );
        navigation.push("/dashboard/projects");
        toast.dismiss(loadingToast);
        toast.success(data.message);
      } catch (err) {
        console.log(err);
        toast.dismiss(loadingToast);
        toast.error(err.message);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const showPass = () => {
    setShowPassword(true);
  };

  const hidePass = () => {
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/sign-up-logo.png" alt="" width={350} />
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                // autoComplete='firstname'
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={formik.touched.username && formik.errors.username}
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                // autoComplete="new-password"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? (
                          <VisibilityOffIcon></VisibilityOffIcon>
                        ) : (
                          <VisibilityIcon></VisibilityIcon>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtrausernames" color="primary" />}
                label="Remember me"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/authentication/signup" variant="body2">
                log in as admin
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
