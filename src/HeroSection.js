import React from "react";
import {Box,Typography,TextField} from "@mui/material";


export default function HeroSection({ onLoginClick }) {
  return (
    <Box sx={{
      background: "linear-gradient(135deg, #f8fff9 0%, #e8f9ed 100%)",
      minHeight: "600px",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      py: { xs: 4, md: 8 },
      px: { xs: 2, md: 4 },
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "60%",
          height: "200%",
          background: "linear-gradient(135deg, rgba(26, 188, 150, 0.05) 0%, rgba(22, 160, 133, 0.02) 100%)",
          borderRadius: "50%",
          zIndex: 0
        }}
      />
      
      {/* Content Section */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { xs: 'center', md: 'flex-start' },
        textAlign: { xs: 'center', md: 'left' },
        zIndex: 1,
        maxWidth: { xs: '100%', md: '600px' },
        pr: { md: 4 }
      }}>
        {/* Main Headline */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
            fontWeight: "700",
            color: "#212529",
            lineHeight: { xs: 1.2, md: 1.1 },
            letterSpacing: "-0.02em",
            mb: 3,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          Find Your Perfect
          <Box component="span" sx={{ 
            background: 'linear-gradient(135deg, #1abc96, #16a085)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block'
          }}>
            Roommate Match
          </Box>
        </Typography>
        
        {/* Subtitle */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            fontWeight: "400",
            color: "#6c757d",
            lineHeight: 1.6,
            mb: 4,
            maxWidth: "500px"
          }}
        >
          Connect with compatible roommates based on lifestyle, preferences, and location. Make housing decisions with confidence.
        </Typography>
        
        {/* CTA Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          width: '100%',
          maxWidth: "500px"
        }}>
          <TextField
            placeholder="Enter your location..."
            variant="outlined"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '400',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: 'none',
                '& fieldset': {
                  border: '1px solid #e9ecef',
                },
                '&:hover fieldset': {
                  borderColor: '#1abc96',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1abc96',
                  borderWidth: '2px'
                },
                '& input': {
                  padding: '16px 18px'
                }
              }
            }}
          />
          <Box
            component="button"
            onClick={onLoginClick}
            sx={{
              background: 'linear-gradient(135deg, #1abc96, #16a085)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: { xs: '16px 32px', sm: '16px 24px' },
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(26, 188, 150, 0.3)',
              transition: 'all 0.3s ease',
              minWidth: { xs: 'auto', sm: '140px' },
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(26, 188, 150, 0.4)'
              }
            }}
          >
            Get Started
          </Box>
        </Box>
        
        {/* Stats or Social Proof */}
        <Box sx={{ 
          display: 'flex',
          gap: 4,
          mt: 6,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ fontSize: '24px', fontWeight: '700', color: '#1abc96' }}>
              1000+
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>
              Happy Roommates
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ fontSize: '24px', fontWeight: '700', color: '#1abc96' }}>
              50+
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>
              Cities
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ fontSize: '24px', fontWeight: '700', color: '#1abc96' }}>
              4.9★
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>
              User Rating
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Image Section */}
      <Box sx={{
        flex: { xs: 'none', md: 1 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 4, md: 0 },
        zIndex: 1,
        maxWidth: { xs: '100%', md: '500px' }
      }}>
        <img
          src="/Hero-owls.png"
          alt="Happy roommates"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))"
          }}
        />
      </Box>
    </Box>
  );
}
