import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MapComponent from "./MapComponent";
import supabase from "./supabaseClient";


export default function Onboarding({ signedIn, user, onSignIn, signOut }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [telegram, setTelegram] = useState("");
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async () => {
    if (!age || !gender || !status || !telegram || !location) {
      alert("Please fill out all fields and select a location on the map.");
      return;
    }
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error("User not authenticated:", userError?.message);
        alert("You must be logged in to complete your profile.");
        return;
      }

      const { error } = await supabase.from("user_details").insert([{ 
        age, 
        gender, 
        status,
        telegram,
        latitude: location[0],
        longitude: location[1]
      }]);
      
      if (error) {
        console.error("Error inserting user details:", error.message);
        alert("Failed to save your details. Please try again.");
      } else {
        console.log("User details saved successfully:", { age, gender, status });
        // Navigate to welcome page on success
        navigate("/welcome");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Header 
        signedIn={signedIn} 
        user={user}
        onSignIn={onSignIn}
        signOut={signOut} 
      />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fff9 0%, #e8f9ed 100%)",
          py: 4,
          px: { xs: 2, md: 4 }
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: "700",
                color: "#212529",
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 2,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Complete Your Profile
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#6c757d",
                fontWeight: "400",
                fontSize: "1.1rem",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              Help us find your perfect roommate match by sharing a few details about yourself
            </Typography>
          </Box>
          
          {/* Form Card */}
          <Box
            sx={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f0f0f0",
              p: { xs: 3, md: 4 }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "600",
                color: "#212529",
                mb: 3,
                fontSize: "1.3rem"
              }}
            >
              Personal Information
            </Typography>
            
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
                mb: 3
              }}
            >
              <FormControl fullWidth>
                <InputLabel 
                  id="age-label"
                  sx={{
                    fontWeight: "500",
                    color: "#495057"
                  }}
                >
                  Age
                </InputLabel>
                <Select
                  labelId="age-label"
                  value={age}
                  label="Age"
                  onChange={(e) => setAge(e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e9ecef'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96',
                      borderWidth: '2px'
                    }
                  }}
                >
                  {Array.from({ length: 50 }, (_, i) => i + 18).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel 
                  id="gender-label"
                  sx={{
                    fontWeight: "500",
                    color: "#495057"
                  }}
                >
                  Gender
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e9ecef'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96',
                      borderWidth: '2px'
                    }
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
              }}
            >
              <FormControl fullWidth>
                <InputLabel 
                  id="status-label"
                  sx={{
                    fontWeight: "500",
                    color: "#495057"
                  }}
                >
                  Relationship Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  label="Relationship Status"
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e9ecef'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1abc96',
                      borderWidth: '2px'
                    }
                  }}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="in_a_relationship">In a Relationship</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Telegram Username"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "12px",
                    '& fieldset': {
                      borderColor: '#e9ecef'
                    },
                    '&:hover fieldset': {
                      borderColor: '#1abc96'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1abc96',
                      borderWidth: '2px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: "500",
                    color: "#495057"
                  }
                }}
                helperText="Enter your Telegram username (e.g., @john_doe)"
              />
            </Box>
          </Box>

          {/* Map Section */}
          <Box
            sx={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f0f0f0",
              p: { xs: 3, md: 4 }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "600",
                color: "#212529",
                mb: 1,
                fontSize: "1.3rem"
              }}
            >
              Your Location
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#6c757d",
                mb: 3,
                fontSize: "1rem",
                lineHeight: 1.6
              }}
            >
              Click on the map to select your preferred location. This helps us match you with nearby roommates.
            </Typography>
            
            <Box sx={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e9ecef"
            }}>
              <MapComponent position={location} setPosition={setLocation} height={400} />
            </Box>
            
            {location && (
              <Box sx={{
                mt: 2,
                p: 2,
                background: "#e8f9ed",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: 2
              }}>
                <Box sx={{
                  width: 24,
                  height: 24,
                  background: "#1abc96",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  ✓
                </Box>
                <Typography variant="body2" sx={{ color: "#16a085", fontWeight: "500" }}>
                  Location selected: {location[0].toFixed(4)}, {location[1].toFixed(4)}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!age || !gender || !status || !telegram || !location}
              sx={{
                background: 'linear-gradient(135deg, #1abc96, #16a085)',
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                py: 2,
                px: 6,
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(26, 188, 150, 0.3)",
                textTransform: "none",
                minWidth: "200px",
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 24px rgba(26, 188, 150, 0.4)"
                },
                '&:disabled': {
                  background: "#e9ecef",
                  color: "#6c757d",
                  boxShadow: "none",
                  transform: "none"
                }
              }}
            >
              Complete Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
