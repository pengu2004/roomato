import React from 'react';
import supabase from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuth from './useAuth';

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
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onClose} // Close when clicking overlay
    >
      <div 
        className="login-modal-content"
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          position: "relative",
          minWidth: "320px",
          maxWidth: "400px",
          width: "90%"
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            padding: "4px"
          }}
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>Welcome to Roomato</h2>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            Sign in to your account or create a new one
          </p>
        </div>
        
        {/* Supabase Auth UI */}
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#46e58bff',
                  brandAccent: '#38ca70ff',
                }
              }
            }
          }}
          providers={[]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
}
