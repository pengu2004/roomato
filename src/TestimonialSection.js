import React from "react";

export default function TestimonialSection() {
  return (
    <section style={{
      display: "flex",
      justifyContent: "center",
      margin: "32px 24px 0 24px",
    }}>
      <div style={testimonialCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <div style={{ fontSize: 36, borderRadius: '50%', background: '#e0f7fa', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😊</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Alex P.</div>
            <div style={{ color: '#888', fontSize: 13 }}>Found a great roommate!</div>
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#333', fontStyle: 'italic', marginBottom: 6 }}>
          “Roomato made it so easy to find someone I actually get along with. Highly recommend!”
        </div>
      </div>
    </section>
  );
}

const testimonialCardStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  padding: "24px 24px 20px 24px",
  minWidth: 280,
  maxWidth: 420,
  flex: 1,
  textAlign: "left",
  marginBottom: 16,
};
