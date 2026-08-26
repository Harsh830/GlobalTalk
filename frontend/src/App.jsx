import React from "react";

export default function App() {
  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>🌍 GlobalTalk</div>

        <div style={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <button style={styles.loginButton}>Login</button>
        </div>
      </nav>

      <main>
        <section id="home" style={styles.hero}>
          <div style={styles.heroContent}>
            <p style={styles.badge}>🌎 Connect Without Borders</p>

            <h1 style={styles.title}>
              Talk to the <span style={styles.highlight}>World.</span>
            </h1>

            <p style={styles.subtitle}>
              GlobalTalk is a modern platform designed to help people from
              different countries connect, communicate and build meaningful
              conversations.
            </p>

            <div style={styles.buttons}>
              <button style={styles.primaryButton}>
                Get Started →
              </button>

              <button style={styles.secondaryButton}>
                Explore GlobalTalk
              </button>
            </div>
          </div>

          <div style={styles.globe}>
            🌍
          </div>
        </section>

        <section id="features" style={styles.features}>
          <h2>Everything you need to connect globally</h2>

          <div style={styles.cards}>
            <Feature
              icon="🔐"
              title="Secure Accounts"
              text="Built with security and privacy in mind."
            />

            <Feature
              icon="🌎"
              title="Global Community"
              text="Connect with people from different countries."
            />

            <Feature
              icon="💬"
              title="Real Conversations"
              text="Communicate and share ideas with people worldwide."
            />
          </div>
        </section>

        <section id="about" style={styles.about}>
          <h2>One platform. The whole world.</h2>

          <p>
            GlobalTalk is being built as a secure full-stack platform with
            authentication, profiles, messaging and international users.
          </p>
        </section>
      </main>

      <footer style={styles.footer}>
        © 2026 GlobalTalk. Built for a connected world.
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f7f9fc",
    color: "#111827",
  },

  navbar: {
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8%",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    fontSize: "22px",
    fontWeight: "800",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  hero: {
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 10%",
    background: "linear-gradient(135deg, #eef6ff, #ffffff)",
  },

  heroContent: {
    maxWidth: "650px",
  },

  badge: {
    color: "#2563eb",
    fontWeight: "700",
  },

  title: {
    fontSize: "64px",
    lineHeight: "1.05",
    margin: "20px 0",
  },

  highlight: {
    color: "#2563eb",
  },

  subtitle: {
    fontSize: "19px",
    lineHeight: "1.7",
    color: "#4b5563",
  },

  buttons: {
    display: "flex",
    gap: "15px",
    marginTop: "30px",
  },

  primaryButton: {
    padding: "15px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "15px 25px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    background: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
  },

  loginButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#111827",
    color: "#ffffff",
    cursor: "pointer",
  },

  globe: {
    fontSize: "180px",
  },

  features: {
    padding: "80px 10%",
    textAlign: "center",
    background: "#ffffff",
  },

  cards: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    marginTop: "40px",
    flexWrap: "wrap",
  },

  card: {
    width: "280px",
    padding: "30px",
    borderRadius: "18px",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    textAlign: "left",
  },

  icon: {
    fontSize: "40px",
  },

  about: {
    padding: "80px 10%",
    textAlign: "center",
  },

  footer: {
    padding: "30px",
    textAlign: "center",
    background: "#111827",
    color: "#ffffff",
  },
};
