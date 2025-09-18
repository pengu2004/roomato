import React from "react";

export default function Header({ onSignIn }) {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "24px 32px 12px 32px",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      margin: 24,
      marginBottom: 0,
      position: "relative",
      zIndex: 10,
      flexWrap: 'wrap',
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 28, marginRight: 8 }}>🏠</span>
        <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>ROOMIE</span>
      </div>
      <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a href="#how" style={navLinkStyle}>How it Works</a>
        <a href="#testimonials" style={navLinkStyle}>Testimonials</a>
        <a href="#faq" style={navLinkStyle}>FAQ</a>
        <button onClick={onSignIn} style={signInBtnStyle}>Sign In</button>
      </nav>
    </header>
  );
}

const navLinkStyle = {
  color: "#222",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: 16,
  padding: "4px 0",
};

const signInBtnStyle = {
  background: "linear-gradient(90deg, #7fbcff 0%, #7fd6c2 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 16,
  padding: "8px 24px",
  marginLeft: 16,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(127,214,194,0.10)",
};
