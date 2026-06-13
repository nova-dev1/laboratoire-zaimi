"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, FlaskConical } from "lucide-react";

export default function Navbar({ isLight, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Repair", href: "#repair" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50, transition: "all 0.5s", background: scrolled ? isLight ? "rgba(255,255,255,0.85)" : "rgba(8,8,24,0.85)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #6C8EFF, #B8A9FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FlaskConical size={18} color="white" />
          </div>
          <div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 18, color: isLight ? "#1a1a2e" : "#ffffff" }}>Labo</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#6C8EFF" }}> Zaimi</span>
            </div>
            <p style={{ fontSize: 10, color: isLight ? "#9ca3af" : "rgba(184,169,255,0.5)", margin: 0 }}>Laboratoire Informatique</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((link) => (
            <a key={link.label} href={link.href} style={{ fontSize: 14, fontWeight: 600, color: isLight ? "#1a1a2e" : "rgba(232,240,255,0.8)", textDecoration: "none" }}>{link.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", background: isLight ? "#E8F0FF" : "rgba(108,142,255,0.1)", color: isLight ? "#6C8EFF" : "#B8A9FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a href="#contact" style={{ padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "white", textDecoration: "none", background: "linear-gradient(to right, #6C8EFF, #B8A9FF)" }}>My Account</a>
        </div>
      </div>
    </nav>
  );
}
