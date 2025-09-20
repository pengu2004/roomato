import React from "react";
import Header from "./Header";

export default function Onboarding({ signedIn ,signOut}) {
  return (
    <>
      <Header signedIn={signedIn} signOut={signOut} />
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #7fbcff 0%, #7fd6c2 100%)",
      color: "#222",
      padding: 24,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
        padding: 40,
        maxWidth: 400,
        width: "100%",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>Welcome to Roomato!</h2>
        <p style={{ fontSize: 17, marginBottom: 24 }}>
          Let's get you set up to find your perfect roommate. Complete your profile to get started.
        </p>
        <button style={{
          background: "linear-gradient(90deg, #7fbcff 0%, #7fd6c2 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 17,
          padding: "12px 32px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(127,214,194,0.10)",
        }}>
          Complete Profile
        </button>
      </div>
    </div></>

  );
}
