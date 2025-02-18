import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearstd_staff } from "../../Redux/std_or_staffSlice";
import { clearRegister, setRegister } from "../../Redux/reglogSlice";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();

  const currentState = useSelector((state) => state.std_staff.isstd_staff);
  const currentStateofreglog = useSelector((state) => state.reglog.isRegister);

  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [successmsg, setSuccessmsg] = useState("");

  const handleclearstd_staff = () => {
    dispatch(clearstd_staff());
    dispatch(clearRegister());
  };

  const handlestd_register = (data) => {
    const userData = { isRegister: data };
    dispatch(setRegister(userData));
  };

  const handleSendOtp = () => {
    axios
      .post("http://127.0.0.1:8000/app1/generate-otp/", {
        reg_number: regNo,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setOtpSent(true);
        setSuccessmsg(response.data.message);
        setError(""); // Clear any previous errors
        setTimeout(() => setSuccessmsg(""), 70000);
      })
      .catch((error) => {
        console.log(error);

        // Extract error message
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.error ||
          "An unknown error occurred";

        // Set error to state
        setError(errorMessage);

        console.log("Error message:", errorMessage);

        // Clear error after 10 seconds
        setTimeout(() => setError(""), 10000);
      });
  };

  const handleRegister = () => {
    // Registration logic http://127.0.0.1:8000/register/
    axios
      .post("http://127.0.0.1:8000/app1/register/", {
        reg_number: regNo,
        password: password,
        otp: otp,
      })
      .then((response) => {
        setError(""); // Clear any previous errors

        setSuccessmsg(response.data.message);

        setTimeout(() => setSuccessmsg(""), 70000);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.detail ||
          "An unexpected error occurred. Please try again.";
        if (errorMessage === "No Student matches the given query.") {
          setError(
            "Registration number not found in our database. Please check your registration number and try again."
          );
        } else {
          setError(errorMessage);
        }
        setTimeout(() => setError(""), 10000); // Clear error after 4 seconds
      });
  };

  return (
    <>
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
            minHeight: 450,
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
            {currentState.isstd_staff === "student"
              ? "Student Register"
              : "Staff Register"}
          </Typography>
          {error && (
            <Alert
              severity="error"
              sx={{ marginBottom: 2 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}
          {successmsg && (
            <Alert
              severity="success"
              sx={{ marginBottom: 2 }}
              onClose={() => setSuccessmsg("")}
            >
              {successmsg}
            </Alert>
          )}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="RegNo"
              variant="outlined"
              fullWidth
              required
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              autoComplete="current-password"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {!otpSent ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                }}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            ) : (
              <>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ marginTop: 2 }}
                  autoComplete="current-password"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                    marginTop: 2,
                  }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Link
              onClick={() => handlestd_register(false)}
              underline="hover"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Login here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
