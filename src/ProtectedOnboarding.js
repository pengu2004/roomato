import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from './supabaseClient';

export default function ProtectedOnboarding({ children, signedIn }) {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!signedIn) {
        setLoading(false);
        return;
      }

      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          setLoading(false);
          return;
        }

        // Check if user already has a profile
        const { data, error } = await supabase
          .from('user_details')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setHasProfile(true);
        }
      } catch (err) {
        console.error('Error checking user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, [signedIn]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // If user is signed in and has a profile, redirect to welcome
  if (signedIn && hasProfile) {
    return <Navigate to="/welcome" replace />;
  }

  // If user is not signed in, redirect to home
  if (!signedIn) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the onboarding form
  return children;
}