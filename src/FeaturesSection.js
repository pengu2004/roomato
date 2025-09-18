import React from "react";

const features = [
  {
    icon: "🔍",
    title: "Smart Matching",
    desc: "Find your perfect roommate with intelligent matching algorithms."
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    desc: "Connect with real, verified people for peace of mind."
  },
  {
    icon: "🔒",
    title: "Secure Messaging",
    desc: "Send messages safely and securely within the platform."
  }
];

export default function FeaturesSection() {
  return (
    <section style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      margin: "32px 24px 0 24px",
      flexWrap: 'wrap',
    }}>
      {features.map((f, i) => (
        <div key={i} style={featureCardStyle}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{f.title}</div>
          <div style={{ color: '#666', fontSize: 15 }}>{f.desc}</div>
        </div>
      ))}
    </section>
  );
}

const featureCardStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  padding: "28px 24px 20px 24px",
  minWidth: 220,
  maxWidth: 260,
  flex: 1,
  textAlign: "center",
  marginBottom: 16,
};
