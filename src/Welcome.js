import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Header from "./Header";
import supabase from "./supabaseClient";

export default function Welcome({ signedIn, user, onSignIn, signOut }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } catch (err) {
        console.error("Error getting user:", err);
      }
    };

    getUserId();
  }, []);

  const theme = {
    primary: "#1976d2",
    background: "#FFFFFF",
    lightGray: "#F5F5F5",
    darkGray: "#666666",
    text: "#333333",
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
          <CardContent sx={{ padding: "32px", textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: theme.text,
                fontSize: "32px",
                mb: 3,
              }}
            >
              Hello! 👋
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: theme.darkGray,
                fontSize: "16px",
                fontWeight: 400,
                mb: 2,
              }}
            >
              Welcome to Roomato! Your profile has been created successfully.
            </Typography>

            <Box
              sx={{
                backgroundColor: theme.lightGray,
                padding: 2,
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.darkGray,
                  fontSize: "12px",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Your User ID:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.text,
                  fontSize: "14px",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {userId || "Loading..."}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.primary,
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              You're all set to start finding your perfect roommate! 🏠
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}