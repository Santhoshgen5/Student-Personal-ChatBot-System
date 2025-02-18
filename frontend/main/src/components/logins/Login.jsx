import React from "react";
import { Typography, Box, TextField, Button, Paper, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearstd_staff } from "../../Redux/std_or_staffSlice";
import { clearRegister, setRegister } from "../../Redux/reglogSlice";
import { useState } from "react";
import { setIslogin, clearIslogin } from "../../Redux/isloginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Register from "./Register";

export default function Login() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.islogin.islogin);

  const currentState = useSelector((state) => state.std_staff.isstd_staff); // Access the state value
  const currentStateofreglog = useSelector((state) => state.reglog.isRegister);

  const handleclearstd_staff = () => {
    dispatch(clearstd_staff());
    dispatch(clearRegister());
  };

  const handlestd_register = (data) => {
    const userData = { isRegister: data };
    dispatch(setRegister(userData)); // Dispatch action to update the state
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/app1/api/login/",
        {
          reg_number: regNo,
          password: password,
        }
      );

      localStorage.setItem("accesstoken", response.data.access);
      localStorage.setItem("refreshtoken", response.data.refresh);
      localStorage.setItem("role", response.data.role);
      dispatch(setIslogin(true));

      navigate(
        response.data.role === "student"
          ? "/student-dashboard"
          : "/staff-dashboard"
      );
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.detail ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <>
      {currentStateofreglog == false ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              width: 400,
              minHeight: 390,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              onClick={handleclearstd_staff}
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                marginBottom: 2,
                textAlign: "left",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Back
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                marginBottom: 2,
              }}
            >
              {currentState.isstd_staff == "student"
                ? "Student Login"
                : "Staff Login"}
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Register "
                variant="outlined"
                fullWidth
                required
                autoComplete="current-password"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLogin}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Don't have an account?{" "}
              <Link
                onClick={() => handlestd_register(true)}
                underline="hover"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Register here
              </Link>
            </Typography>
          </Paper>
        </Box>
      ) : (
        <Register />
      )}
    </>
  );
}
