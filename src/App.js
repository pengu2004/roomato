
import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialSection from "./TestimonialSection";
import Footer from "./Footer";
import Login from "./Login";
import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import ProtectedOnboarding from "./ProtectedOnboarding";
import useAuth from "./useAuth";
import supabase from "./supabaseClient";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

    const { signedIn, signOut } = useAuth();


  async function handleAuthSuccess() {
    setShowLogin(false);
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        navigate("/onboarding");
        return;
      }

      // Check if user already has a profile
      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        // User has profile, go to welcome
        navigate("/welcome");
      } else {
        // User needs to complete onboarding
        navigate("/onboarding");
      }
    } catch (err) {
      console.error('Error checking user profile:', err);
      navigate("/onboarding");
    }
  }


  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ background: '#f6f8fa', minHeight: '100vh' }}>
            <Header onSignIn={() => setShowLogin(true)} signedIn={signedIn} signOut={signOut} />
            <HeroSection onGetStarted={() => setShowLogin(true)} />
            <FeaturesSection />
            <TestimonialSection />
            <Footer />

            {showLogin && (
              <div style={modalOverlayStyle} onClick={() => setShowLogin(false)}>
                <div style={modalContainerStyle} onClick={e => e.stopPropagation()}>
                  <button style={closeBtnStyle} onClick={() => setShowLogin(false)}>&times;</button>
                  <Login onAuthSuccess={handleAuthSuccess} />
                </div>
              </div>
            )}
          </div>
        }
      />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedOnboarding signedIn={signedIn}>
            <Onboarding signedIn={signedIn} signOut={signOut} />
          </ProtectedOnboarding>
        } 
      />
      <Route path="/welcome" element={<Welcome signedIn={signedIn} signOut={signOut} />} />
    </Routes>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContainerStyle = {
  background: '#000000ff',
  borderRadius: 20,
  boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
  padding: 32,
  maxWidth: 360,
  width: '90%',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 12,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 28,
  color: '#888',
  cursor: 'pointer',
};


export default App;
