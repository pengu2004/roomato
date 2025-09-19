import React from "react";

export default function Footer() {
  return (
    <footer style={{
      margin: "32px 0 0 0",
      padding: "24px 0 12px 0",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      textAlign: "center",
      fontSize: 15,
      color: "#888",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
    }}>
      
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 6 }}>
        <a href="#" style={linkStyle}>Privacy Policy</a>
        <a href="#" style={linkStyle}>Terms of Service</a>
      </div>
      <div style={{ fontSize: 13, color: '#bbb' }}>
        &copy; {new Date().getFullYear()} Roomato
      </div>
      <div style={{ fontSize: 13, color: '#bbb' }}>
        Made with <span style={{ color: 'red' }}>♥</span> by Tejus and David
      </div>
    </footer>
  );
}

const iconStyle = {
  fontSize: 22,
  color: '#888',
  textDecoration: 'none',
  margin: '0 6px',
};

const linkStyle = {
  color: '#888',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 15,
};
