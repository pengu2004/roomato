import React from "react";
import {Box,Typography,TextField} from "@mui/material";


export default function HeroSection() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
      }}>
        <Typography variant="h3" sx={{ fontSize: { xs: "2.0rem", md: "1.5rem" } }}>
          Find Your Perfect Match, Not Just a Roommate
        </Typography>
        <TextField
          id="outlined-basic"
          label="Search Now"
          variant="outlined"
          sx={{
            backgroundColor: '#ffffffff',
            borderRadius: '8px',
            border: '1px solid #72c58aff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            mt: 3,
            maxWidth: "400px"
          }}
        />
      </Box>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "400px"
      }}>
        <img
          src="/Hero-owls.png"
          alt="Hero"
          style={{
            width: "100%",
            maxHeight: "400px",
            maxWidth: "400px",
            height: "auto",
            objectFit: "contain",
            display: "block"
          }}
        />
      </Box>
    </Box>
  );
}
