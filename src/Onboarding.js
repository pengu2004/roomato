import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MapComponent from "./MapComponent";
import supabase from "./supabaseClient";


export default function Onboarding({ signedIn, signOut }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async () => {
    if (!age || !gender || !status || !location) {
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
      <Header signedIn={signedIn} signOut={signOut} />
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Complete Your Profile
        </Typography>
        
        {/* Form Fields */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <FormControl>
            <InputLabel id="age-label">Age</InputLabel>
            <Select
              labelId="age-label"
              value={age}
              label="Age"
              onChange={(e) => setAge(e.target.value)}
            >
              {Array.from({ length: 50 }, (_, i) => i + 18).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="in_a_relationship">In a Relationship</MenuItem>
              <MenuItem value="married">Married</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Map Section */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Your Location
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click on the map to select your preferred location
          </Typography>
          <MapComponent position={location} setPosition={setLocation} height={400} />
          {location && (
            <Typography variant="body2" sx={{ mt: 1, color: "#4ec688ff" }}>
              Selected: {location[0].toFixed(4)}, {location[1].toFixed(4)}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4ec688ff",
            color: "#fff",
            fontWeight: "bold",
            py: 1.5,
            px: 4,
            boxShadow: 2,
            alignSelf: "center",
            '&:hover': {
              backgroundColor: "#4cc474ff"
            }
          }}
          onClick={handleSubmit}
        >
          Submit Profile
        </Button>
      </Box>
    </>
  );
}
