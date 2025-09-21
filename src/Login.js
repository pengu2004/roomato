import React from 'react';
import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuth from './useAuth';
import { Avatar } from '@mui/material';

export default function Login({ isOpen, onClose }) {
  const { signedIn, loading } = useAuth();

  // Auto-close modal if user is already signed in
  React.useEffect(() => {
    if (signedIn && isOpen) {
      onClose();
    }
  }, [signedIn, isOpen, onClose]);

  // Don't show anything if loading or user is signed in
  if (loading || signedIn) {
    return null;
  }

  // Don't show modal if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="login-modal-overlay"
      style={{
        position: "fixed",
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div 
        className="login-modal-content"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          position: "relative",
          minWidth: "360px",
          maxWidth: "420px",
          width: "100%",
          border: "1px solid #f0f0f0"
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#f8f9fa",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            fontSize: "18px",
            cursor: "pointer",
            color: "#6c757d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#e9ecef";
            e.target.style.color = "#495057";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#f8f9fa";
            e.target.style.color = "#6c757d";
          }}
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Header */}
        <div style={{ 
          textAlign: "center",
          marginBottom: "32px" 
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #1abc96, #16a085)",
            borderRadius: "50%",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "white",
            fontWeight: "bold"
          }}>
          <Avatar sx={{ bgcolor: 'transparent', width: 24, height: 24 }}><img src="roomato-logo.png" alt="Logo" height="90" /></Avatar>
          </div>
          <h2 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "26px",
            fontWeight: "600",
            color: "#212529",
            letterSpacing: "-0.5px"
          }}>
            Welcome to Roomato
          </h2>
          <p style={{ 
            margin: 0, 
            color: "#6c757d", 
            fontSize: "15px",
            lineHeight: "1.4"
          }}>
            Find your perfect roommate match
          </p>
        </div>
        
        {/* Supabase Auth UI */}
        <div style={{ marginTop: "24px" }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#1abc96',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '15px',
                  padding: '12px 16px',
                  border: 'none',
                  transition: 'all 0.2s ease'
                },
                anchor: {
                  color: '#1abc96',
                  textDecoration: 'none',
                  fontWeight: '500'
                },
                divider: {
                  background: '#e9ecef',
                  margin: '24px 0'
                },
                input: {
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  padding: '12px 16px',
                  fontSize: '15px',
                  transition: 'border-color 0.2s ease'
                },
                label: {
                  color: '#495057',
                  fontWeight: '500',
                  fontSize: '14px',
                  marginBottom: '6px'
                },
                message: {
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px'
                }
              },
              variables: {
                default: {
                  colors: {
                    brand: '#1abc96',
                    brandAccent: '#16a085',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#f8f9fa',
                    defaultButtonBackgroundHover: '#e9ecef',
                    inputBackground: 'white',
                    inputBorder: '#dee2e6',
                    inputBorderHover: '#1abc96',
                    inputBorderFocus: '#1abc96'
                  },
                  space: {
                    spaceSmall: '4px',
                    spaceMedium: '8px',
                    spaceLarge: '16px',
                    labelBottomMargin: '6px',
                    anchorBottomMargin: '4px',
                    emailInputSpacing: '4px',
                    socialAuthSpacing: '4px',
                    buttonPadding: '12px 16px',
                    inputPadding: '12px 16px'
                  },
                  fontSizes: {
                    baseBodySize: '15px',
                    baseInputSize: '15px',
                    baseLabelSize: '14px',
                    baseButtonSize: '15px'
                  },
                  fonts: {
                    bodyFontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`,
                    buttonFontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`,
                    inputFontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`,
                    labelFontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px'
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px'
                  }
                }
              }
            }}
            providers={['google']}
            redirectTo={window.location.origin}
            showLinks={true}
            magicLink={false}
          />
        </div>
      </div>
    </div>
  );
}
