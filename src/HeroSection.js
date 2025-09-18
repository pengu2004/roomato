import React from "react";

export default function HeroSection({ onGetStarted }) {
  return (
    <section style={{
      background: "linear-gradient(90deg, #7fbcff 0%, #7fd6c2 100%)",
      borderRadius: 18,
      margin: 24,
      marginTop: 0,
      padding: "40px 24px 32px 24px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h1 style={{ color: "#222", fontWeight: 800, fontSize: 32, marginBottom: 12 }}>
          Find Your Perfect Match, <br />Not Just a Roommate
        </h1>
        <div style={{ color: "#222", fontSize: 18, marginBottom: 28, opacity: 0.95 }}>
          Connecting you with compatible roommates for a happier living experience
        </div>
        <button onClick={onGetStarted} style={getStartedBtnStyle}>Get Started</button>
      </div>
      <div style={{ flex: 1, minWidth: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Simple illustration using emoji */}
        <div style={{ fontSize: 90, textAlign: 'center' }}>🧑‍🤝‍🧑💬🛋️</div>
      </div>
    </section>
  );
}

const getStartedBtnStyle = {
  background: "#fff",
  color: "#22b6c2",
  border: "none",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 18,
  padding: "12px 32px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(127,214,194,0.10)",
};
