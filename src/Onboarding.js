import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Header from "./Header";

export default function Onboarding({ signedIn, signOut }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ age, gender, status });
  };

  const theme = {
    primary: "#1976d2",
    primaryHover: "#1565c0",
    background: "#FFFFFF",
    lightGray: "#F5F5F5",
    darkGray: "#666666",
    text: "#333333",
  };

  return (
    <>
      <Header signedIn={signedIn} signOut={signOut} />
      {/* Progress indicator */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "#F5F5F5",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: theme.primary,
            borderRadius: "0 2px 2px 0",
          }}
        />
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.lightGray,
          padding: 3,
        }}
      >
        <Card
          elevation={1}
          sx={{
            backgroundColor: theme.background,
            borderRadius: "8px",
            maxWidth: 480,
            width: "100%",
          }}
        >
          <CardContent sx={{ padding: "32px" }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.text,
                  fontSize: "24px",
                  mb: 1,
                }}
              >
                Tell us about yourself
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.darkGray,
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Help us personalize your experience
              </Typography>
            </Box>

            {/* Form Fields */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}
            >
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: theme.darkGray,
                    "&.Mui-focused": { color: theme.primary },
                  }}
                >
                  Age Range
                </InputLabel>
                <Select
                  value={age}
                  label="Age Range"
                  onChange={(e) => setAge(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                  }}
                >
                  <MenuItem value="18-22">18-22</MenuItem>
                  <MenuItem value="23-27">23-27</MenuItem>
                  <MenuItem value="28-32">28-32</MenuItem>
                  <MenuItem value="33-37">33-37</MenuItem>
                  <MenuItem value="38+">38+</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: theme.darkGray,
                    "&.Mui-focused": { color: theme.primary },
                  }}
                >
                  Gender Identity
                </InputLabel>
                <Select
                  value={gender}
                  label="Gender Identity"
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="non-binary">Non-binary</MenuItem>
                  <MenuItem value="prefer-not-to-say">
                    Prefer not to say
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: theme.darkGray,
                    "&.Mui-focused": { color: theme.primary },
                  }}
                >
                  Current Status
                </InputLabel>
                <Select
                  value={status}
                  label="Current Status"
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.primary,
                    },
                  }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!age || !gender || !status}
              fullWidth
              sx={{
                backgroundColor: theme.primary,
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "16px",
                padding: "12px 24px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.primaryHover,
                },
                "&:disabled": {
                  backgroundColor: "#E0E0E0",
                  color: "#AAAAAA",
                },
              }}
            >
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
