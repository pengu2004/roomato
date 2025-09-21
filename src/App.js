
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialSection from "./TestimonialSection";
import Footer from "./Footer";
import Login from "./Login";
import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import useAuth from "./useAuth";
import supabase from "./supabaseClient";

// Inner component that has access to useNavigate
function AppContent() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { signedIn, loading, user, session, signOut } = useAuth();
  const navigate = useNavigate();

  // Function to open login modal
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  // Handle logout with navigation
  const handleSignOut = async () => {
    await signOut();
    navigate("/"); // Redirect to home page after logout
  };

  // Handle navigation after successful login
  useEffect(() => {
    const handleAuthChange = async () => {
      if (session && signedIn) {
        try {
          const { data, error } = await supabase
            .from('user_details')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (data && !error) {
            navigate("/welcome");
          } else {
            navigate("/onboarding");
          }
        } catch (err) {
          console.error('Error checking user profile:', err);
          navigate("/onboarding");
        }
      }
    };

    if (session) {
      handleAuthChange();
    }
  }, [session,signedIn,navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        signedIn={signedIn} 
        user={user} 
        onSignIn={openLoginModal}
        signOut={handleSignOut}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection onLoginClick={openLoginModal} />
            <FeaturesSection />
            <TestimonialSection />
            <Footer />
          </>
        } />
        <Route path="/onboarding" element={
          <Onboarding 
            signedIn={signedIn} 
            user={user}
            onSignIn={openLoginModal}
            signOut={handleSignOut}
          />
        } />
        <Route path="/welcome" element={
          <Welcome 
            signedIn={signedIn} 
            user={user}
            onSignIn={openLoginModal}
            signOut={handleSignOut}
          />
        } />
      </Routes>

      {/* Login Modal */}
      <Login 
        isOpen={loginModalOpen} 
        onClose={closeLoginModal} 
      />
    </div>
  );
}

// Main App component with Router
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
