import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Header from "./Header";
import supabase from "./supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

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
          background: "linear-gradient(135deg, #f8fff9 0%, #e8f9ed 100%)",
          py: 4,
          px: { xs: 2, md: 4 }
        }}
      >
        {/* Welcome Header */}
        <Box sx={{ 
          textAlign: "center", 
          mb: 6,
          maxWidth: "600px",
          mx: "auto"
        }}>
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
            Welcome to Roomato! 
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#6c757d",
              fontWeight: "400",
              fontSize: "1.1rem",
              lineHeight: 1.6
            }}
          >
            Start connecting with potential roommates near you!
          </Typography>
        </Box>

        {/* Nearby Users Section */}
        <Box sx={{ maxWidth: "1200px", mx: "auto", mb: 6 }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            mb: 3
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "600",
                color: "#212529",
                fontSize: "1.5rem"
              }}
            >
              Nearby Roommates
            </Typography>
            <Box sx={{
              background: 'linear-gradient(135deg, #1abc96, #16a085)',
              color: 'white',
              borderRadius: '20px',
              px: 3,
              py: 1,
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {nearbyUsers.length} matches found
            </Box>
          </Box>
          
          {nearbyUsers.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { 
                  xs: "1fr", 
                  sm: "repeat(2, 1fr)", 
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)"
                },
                gap: 3,
              }}
            >
              {nearbyUsers.map((roommate, index) => (
                <Card 
                  key={roommate.id || index} 
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #f0f0f0",
                    transition: "all 0.3s ease",
                    '&:hover': {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)"
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Avatar */}
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #1abc96, #16a085)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2,
                        mx: 'auto'
                      }}
                    >
                      {roommate.gender === 'male' ? '👨' : roommate.gender === 'female' ? '👩' : '👤'}
                    </Box>
                    
                    {/* Info */}
                    <Box sx={{ textAlign: "center" }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: "600",
                          color: "#212529",
                          mb: 1,
                          fontSize: "1.1rem"
                        }}
                      >
                        Age {roommate.age}
                      </Typography>
                      
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#6c757d",
                              fontSize: "0.9rem",
                              textTransform: "capitalize"
                            }}
                          >
                            {roommate.gender}
                          </Typography>
                        </Box>
                        
                        <Box sx={{
                          background: "#e8f9ed",
                          borderRadius: "12px",
                          px: 2,
                          py: 1,
                          display: "inline-block"
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#16a085",
                              fontSize: "0.85rem",
                              fontWeight: "500",
                              textTransform: "capitalize"
                            }}
                          >
                            {roommate.status.replace('_', ' ')}
                          </Typography>
                        </Box>
                        
                        {/* Telegram Contact */}
                        {roommate.telegram && (
                          <Box sx={{
                            background: "#e3f2fd",
                            borderRadius: "12px",
                            px: 2,
                            py: 1,
                            display: "inline-block",
                            mt: 1
                          }}>
                            <Box sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1
                            }}>
                              <Typography sx={{ fontSize: "0.8rem" }}><FontAwesomeIcon icon={faTelegram} /></Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: "#1976d2",
                                  fontSize: "0.8rem",
                                  fontWeight: "500",
                                  fontFamily: "monospace"
                                }}
                              >
                                {roommate.telegram}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Card sx={{
              borderRadius: "16px",
              border: "2px dashed #dee2e6",
              background: "transparent",
              textAlign: "center",
              py: 6
            }}>
              <CardContent>
                <Typography sx={{ fontSize: "3rem", mb: 2 }}>🔍</Typography>
                <Typography variant="h6" sx={{ color: "#6c757d", mb: 1 }}>
                  No nearby roommates yet
                </Typography>
                <Typography variant="body2" sx={{ color: "#6c757d" }}>
                  We'll notify you when someone joins your area!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

      </Box>
    </>
  );
}