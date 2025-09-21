import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Header from "./Header";
import supabase from "./supabaseClient";

export default function Welcome({ signedIn, user, onSignIn, signOut }) {
  const [userId, setUserId] = useState("");
  const[userLat,setUserLat]=useState(0)
  const[userLong,setUserLong]=useState(0)
  const [users,setUsers]=useState([])

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
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user_details")
        .select("*")

      if (error) {
        console.error(error)
      } else {
        setUsers(data)
        console.log(data)
      }
    }

    fetchUsers()
  }, [])

  function getDistance(lat1,long1,lat2,long2){
    console.log("Calculating distance between:",lat1,long1,lat2,long2)
  const R=6371
  if (lat1==lat2 && long1==long2) 
    console.log("same")
  return 0
  const dLon = (long2 - long1) * Math.PI / 180
  const dLat=(lat2-lat1)* Math.PI/180
  
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c

}
const radius = 10
const nearbyUsers = users.filter(u => {
  if (u.user_id === userId) return false

  return getDistance(userLat, userLong, u.latitude, u.longitude) <= radius
})
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('user_details')
            .select('latitude, longitude')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error("Error fetching user location:", error.message);
          } else if (data) {
            setUserLat(data.latitude);
            setUserLong(data.longitude);
          }
        }
      } catch (err) {
        console.error("Error getting user location:", err);
      }
    };

    getUserLocation();
  }, [userId, userLat, userLong]);



  const theme = {
    primary: "#41983dff",
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
        <Box sx={{ width: "100%", maxWidth: 800, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You have {nearbyUsers.length} users near you
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {nearbyUsers?.map((user, index) => (
              <Card key={user.id || index} sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Age: {user.age}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Gender: {user.gender}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Status: {user.status}
                  </Typography>
                  {/* Add more user info here if needed */}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
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
            <Card>
            </Card>
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