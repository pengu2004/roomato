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
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        backdropFilter: 'blur(10px)',
        height: '72px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: { xs: 2, md: 4 }
      }}
    >
      {/* Logo Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #1abc96, #16a085)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(26, 188, 150, 0.3)'
          }}
        >
          R
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '700',
              color: '#212529',
              fontSize: '20px',
              lineHeight: 1,
              letterSpacing: '-0.5px'
            }}
          >
            Roomato
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#6c757d',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: 1
            }}
          >
            Find your space
          </Typography>
        </Box>
      </Box>
      
      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />
      
      {/* User Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {user && signedIn && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#495057',
              fontWeight: '500',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {user.email}
          </Typography>
        )}
        
        {signedIn ? (
          <Button
            variant="outlined"
            onClick={signOut}
            sx={{
              borderColor: '#dee2e6',
              color: '#495057',
              fontWeight: '500',
              fontSize: '14px',
              borderRadius: '8px',
              px: 3,
              py: 1,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#1abc96',
                backgroundColor: '#f8fff9',
                color: '#1abc96'
              }
            }}
          >
            Sign out
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onSignIn}
            sx={{
              backgroundColor: '#1abc96',
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
              borderRadius: '8px',
              px: 3,
              py: 1,
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(26, 188, 150, 0.3)',
              '&:hover': {
                backgroundColor: '#16a085',
                boxShadow: '0 4px 12px rgba(26, 188, 150, 0.4)'
              }
            }}
          >
            Sign in
          </Button>
        )}
      </Box>
    </AppBar>
    <Toolbar sx={{ height: '72px' }} />
  </>
  );
}
