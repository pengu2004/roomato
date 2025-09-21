import React from "react";
import AppBar from '@mui/material/AppBar';
import { Typography } from "@mui/material";
import {Avatar,Box,Button,Toolbar} from "@mui/material";

export default function Header({ 
  signedIn , 
  user , 
  onSignIn, 
  signOut 
}) {

  
  return (
    <>
    <AppBar position="fixed" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',backgroundColor: '#ffffffff',
    }}>
      <Avatar
        src="/roomato-logo.png"
        alt="Roomato Logo"
        sx={{ width: 100, height: 90, padding: 0 }}
        />
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:1,}}>
      <Typography
        variant="h4"
        fontFamily="Montserrat, sans-serif"
        fontWeight="bold"
        color="#1abc96ff"
        sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
      >
        
        
        Roomato

      </Typography>
      <Typography color="#1abc96ff">Find your space</Typography>
      </Box>
      
      <Box sx={{ flexGrow: 3,display:"flex",flexDirection:"row"}} >
    
    {signedIn ? (
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#1abc96ff", ml: "1rem", mr: "1rem" }}
        onClick={signOut}
      >
        Sign out
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#1abc96ff", ml: "auto", mr: "1rem" }}
        onClick={onSignIn}
      >
        Sign in
      </Button>
    )}
    </Box>
    
    </AppBar>
    <Toolbar sx={{ height: '100px' }} />

  </>
  );
}
