import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

export default function ProtectedRoute({ children }) {
  const { signedIn, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #f8fff9 0%, #e8f9ed 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1abc96, #16a085)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white',
            fontWeight: 'bold',
            margin: '0 auto 16px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            R
          </div>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            fontWeight: '500',
            margin: 0
          }}>
            Verifying your access...
          </p>
        </div>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // Redirect to home with auth prompt if not authenticated
  if (!signedIn) {
    return <Navigate to="/?auth=required" replace />;
  }

  // Render the protected component if authenticated
  return children;
}