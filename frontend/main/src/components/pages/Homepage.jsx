import React from "react";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import { Box, Typography, Link } from "@mui/material";
import backgroundpic from "../../assets/imgs/clgbackground.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setstd_staff } from "../../Redux/std_or_staffSlice";
import Loginpage from "./Loginpage";

export default function Homepage() {
  const dispatch = useDispatch(); // Access the dispatch function from Redux

  const currentState = useSelector((state) => state.std_staff.isstd_staff); // Access the state value

  const handlestd_staff = (data) => {
    const userData = { isstd_staff: data };
    dispatch(setstd_staff(userData)); // Dispatch action to update the state
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${backgroundpic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* Top Bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "60px",
              backgroundColor: "rgba(0, 0, 0, 0.58)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: "10px", sm: "50px", md: "150px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
              }}
            >
              <Email
                sx={{ font: { sm: "10px", md: "27px" }, color: "white" }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "11px", sm: "13px", md: "16px" },
                  fontWeight: "bold",
                }}
              >
                principal@mrgac.ac.in
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
              }}
            >
              <Phone
                sx={{ font: { xs: "10px", sm: "27px" }, color: "white" }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "11px", sm: "13px", md: "16px" },
                  fontWeight: "bold",
                }}
              >
                +91 4367 255440
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
              }}
            >
              <LocationOn
                sx={{ font: { xs: "10px", sm: "27px" }, color: "white" }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "11px", sm: "13px", md: "16px" },
                  fontWeight: "bold",
                }}
              >
                Mannargudi, Tamil Nadu, India
              </Typography>
            </Box>
          </Box>

          {/* Main Content */}
          {currentState === null ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                gap: "46px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link
                underline="none"
                onClick={() => handlestd_staff("student")}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  padding: "8px 13px",
                  color: "black",
                  borderRadius: "6px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#f0f0f0",
                    color: "blue",
                  },
                  width: "auto",
                }}
              >
                As Student
              </Link>
              <Link
                underline="none"
                onClick={() => handlestd_staff("staff")}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  padding: "8px 28px",
                  color: "black",
                  borderRadius: "6px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  ":hover": {
                    color: "blue",
                  },
                  width: "auto",
                }}
              >
                As Staff
              </Link>
            </Box>
          ) : (
            <Loginpage />
          )}
        </Box>
      </Box>
    </>
  );
}
