const fs = require("fs");

const globals = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

@import "tailwindcss";

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: "Nunito", sans-serif; background-color: #080818; color: #E8F0FF; overflow-x: hidden; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #080818; }
::-webkit-scrollbar-thumb { background: #6C8EFF; border-radius: 10px; }
.glass { background: rgba(108,142,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(184,169,255,0.15); border-radius: 20px; }
.glass-light { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(108,142,255,0.2); border-radius: 20px; }
.glow-blue { box-shadow: 0 0 30px rgba(108,142,255,0.3); }
.glow-purple { box-shadow: 0 0 30px rgba(184,169,255,0.3); }
.text-glow { text-shadow: 0 0 20px rgba(108,142,255,0.5); }
`;

const supabaseLib = `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
`;

const adminPage = `"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Package, MessageCircle, LogOut, Eye, EyeOff } from "lucide-react";

const ADMIN_PASSWORD = "zaimi2026admin";
const categories = ["desktops","laptops","networking","components","cctv","tools"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:"", description:"", price:"", category:"desktops", image_url:"", in_stock:true });

  useEffect(() => {
    if (authed) { fetchProducts(); fetchMessages(); }
  }, [authed]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  };

  const fetchMessages = async () => {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
  };

  const addProduct = async () => {
    if (!form.name || !form.category) return;
    setLoading(true);
    await supabase.from("products").insert([form]);
    setForm({ name:"", description:"", price:"", category:"desktops", image_url:"", in_stock:true });
    await fetchProducts();
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    await fetchProducts();
  };

  const deleteMessage = async (id) => {
    await supabase.from("messages").delete().eq("id", id);
    await fetchMessages();
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setError(""); }
    else setError("Wrong password!");
  };

  if (!authed) {
    return (
      <main style={{ minHeight:"100vh", backgroundColor:"#080818", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Nunito,sans-serif" }}>
        <div style={{ padding:"48px", borderRadius:24, background:"rgba(108,142,255,0.05)", border:"1px solid rgba(184,169,255,0.15)", backdropFilter:"blur(12px)", width:"100%", maxWidth:400, textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
          <h1 style={{ fontSize:24, fontWeight:800, color:"#ffffff", marginBottom:8 }}>Admin Dashboard</h1>
          <p style={{ fontSize:14, color:"rgba(232,240,255,0.5)", marginBottom:32 }}>ETS ZAIMI — Laboratoire Informatique</p>
          <div style={{ position:"relative", marginBottom:16 }}>
            <input type={showPass ? "text" : "password"} placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width:"100%", padding:"14px 48px 14px 16px", borderRadius:12, border:"1px solid rgba(108,142,255,0.3)", background:"rgba(108,142,255,0.05)", color:"#ffffff", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none", boxSizing:"border-box" }} />
            <button onClick={() => setShowPass(!showPass)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#6C8EFF", cursor:"pointer" }}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p style={{ color:"#ff6b6b", fontSize:13, marginBottom:16 }}>{error}</p>}
          <button onClick={handleLogin} style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", color:"white", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"Nunito,sans-serif" }}>Login</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight:"100vh", backgroundColor:"#080818", color:"#E8F0FF", fontFamily:"Nunito,sans-serif" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:40 }}>
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:"#ffffff", margin:0 }}>Admin Dashboard</h1>
            <p style={{ fontSize:14, color:"rgba(232,240,255,0.5)", margin:"4px 0 0" }}>ETS ZAIMI — Full Control Panel</p>
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <a href="/" style={{ padding:"10px 20px", borderRadius:999, fontSize:13, fontWeight:700, color:"#6C8EFF", textDecoration:"none", border:"1px solid rgba(108,142,255,0.3)" }}>View Site</a>
            <button onClick={() => setAuthed(false)} style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 20px", borderRadius:999, fontSize:13, fontWeight:700, color:"white", background:"rgba(255,100,100,0.2)", border:"1px solid rgba(255,100,100,0.3)", cursor:"pointer" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:32 }}>
          {[
            { id:"products", icon:<Package size={16} />, label:"Products ("+products.length+")" },
            { id:"messages", icon:<MessageCircle size={16} />, label:"Messages ("+messages.length+")" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:999, fontSize:13, fontWeight:700, cursor:"pointer", border:"none", background:tab===t.id?"linear-gradient(to right,#6C8EFF,#B8A9FF)":"rgba(108,142,255,0.1)", color:tab===t.id?"white":"#B8A9FF" }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <div style={{ padding:"28px", borderRadius:20, background:"rgba(108,142,255,0.05)", border:"1px solid rgba(184,169,255,0.1)", marginBottom:32 }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:"#ffffff", margin:"0 0 20px" }}>Add New Product</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }}>
                <input placeholder="Product name *" value={form.name} onChange={e => setForm({...form, name:e.target.value})} style={{ padding:"12px 16px", borderRadius:10, border:"1px solid rgba(108,142,255,0.2)", background:"rgba(108,142,255,0.05)", color:"#ffffff", fontSize:13, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                <input placeholder="Price (ex: 45,000 DZD)" value={form.price} onChange={e => setForm({...form, price:e.target.value})} style={{ padding:"12px 16px", borderRadius:10, border:"1px solid rgba(108,142,255,0.2)", background:"rgba(108,142,255,0.05)", color:"#ffffff", fontSize:13, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                <select value={form.category} onChange={e => setForm({...form, category:e.target.value})} style={{ padding:"12px 16px", borderRadius:10, border:"1px solid rgba(108,142,255,0.2)", background:"#080818", color:"#ffffff", fontSize:13, fontFamily:"Nunito,sans-serif", outline:"none" }}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="Image URL (optional)" value={form.image_url} onChange={e => setForm({...form, image_url:e.target.value})} style={{ padding:"12px 16px", borderRadius:10, border:"1px solid rgba(108,142,255,0.2)", background:"rgba(108,142,255,0.05)", color:"#ffffff", fontSize:13, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description:e.target.value})} style={{ padding:"12px 16px", borderRadius:10, border:"1px solid rgba(108,142,255,0.2)", background:"rgba(108,142,255,0.05)", color:"#ffffff", fontSize:13, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <label style={{ fontSize:13, color:"rgba(232,240,255,0.7)" }}>In Stock:</label>
                  <input type="checkbox" checked={form.in_stock} onChange={e => setForm({...form, in_stock:e.target.checked})} style={{ width:18, height:18, cursor:"pointer" }} />
                </div>
              </div>
              <button onClick={addProduct} disabled={loading} style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:8, padding:"12px 28px", borderRadius:999, fontSize:14, fontWeight:700, color:"white", background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", border:"none", cursor:"pointer" }}>
                <Plus size={16} /> {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {products.length === 0 && <p style={{ color:"rgba(232,240,255,0.4)", textAlign:"center", padding:40 }}>No products yet — add your first one above!</p>}
              {products.map(p => (
                <div key={p.id} style={{ padding:"20px 24px", borderRadius:16, background:"rgba(108,142,255,0.04)", border:"1px solid rgba(184,169,255,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    {p.image_url && <img src={p.image_url} alt={p.name} style={{ width:48, height:48, borderRadius:10, objectFit:"cover" }} />}
                    <div>
                      <p style={{ fontSize:15, fontWeight:700, color:"#ffffff", margin:0 }}>{p.name}</p>
                      <p style={{ fontSize:12, color:"rgba(232,240,255,0.5)", margin:"2px 0 0" }}>{p.category} • {p.price || "No price"} • {p.in_stock ? "In Stock" : "Out of Stock"}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:999, fontSize:12, fontWeight:700, color:"#ff6b6b", background:"rgba(255,107,107,0.1)", border:"1px solid rgba(255,107,107,0.2)", cursor:"pointer" }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {messages.length === 0 && <p style={{ color:"rgba(232,240,255,0.4)", textAlign:"center", padding:40 }}>No messages yet!</p>}
            {messages.map(m => (
              <div key={m.id} style={{ padding:"24px", borderRadius:16, background:"rgba(108,142,255,0.04)", border:"1px solid rgba(184,169,255,0.1)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div>
                    <p style={{ fontSize:15, fontWeight:700, color:"#ffffff", margin:0 }}>{m.name}</p>
                    <p style={{ fontSize:12, color:"#6C8EFF", margin:"2px 0 0" }}>{m.email} • {m.phone}</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <p style={{ fontSize:11, color:"rgba(232,240,255,0.3)", margin:0 }}>{new Date(m.created_at).toLocaleDateString()}</p>
                    <button onClick={() => deleteMessage(m.id)} style={{ display:"flex", alignItems:"center", gap:4, padding:"6px 12px", borderRadius:999, fontSize:11, fontWeight:700, color:"#ff6b6b", background:"rgba(255,107,107,0.1)", border:"1px solid rgba(255,107,107,0.2)", cursor:"pointer" }}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
                <p style={{ fontSize:14, color:"rgba(232,240,255,0.7)", margin:0, lineHeight:1.6 }}>{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
`;

const starfield = `"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let time = 0;
    const colors = ["#ffffff", "#E8F0FF", "#B8A9FF", "#6C8EFF", "#c8d8ff"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 3 + 0.5,
      size: Math.random() * 2.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;
      stars.forEach((star) => {
        const px = star.x + mouseX * star.z * 12;
        const py = star.y + mouseY * star.z * 12;
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
        const finalOpacity = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.globalAlpha = finalOpacity;
        ctx.fillStyle = star.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
  );
}
`;

const navbar = `"use client";
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
`;

const hero = `"use client";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Cpu } from "lucide-react";

export default function Hero({ isLight }) {
  const badges = [
    { icon: <Zap size={14} />, label: "Networking & Infrastructure" },
    { icon: <Shield size={14} />, label: "Cybersecurity" },
    { icon: <Cpu size={14} />, label: "AI & Automation" },
  ];
  const stats = [
    { number: "5+", label: "Service Domains" },
    { number: "100%", label: "Satisfaction Goal" },
    { number: "24/7", label: "Support Ready" },
    { number: "inf", label: "Solutions" },
  ];

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center", zIndex: 10 }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: isLight ? "radial-gradient(circle, rgba(108,142,255,0.08) 0%, transparent 70%)" : "radial-gradient(circle, rgba(108,142,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12, marginBottom:32 }}>
        {badges.map((badge, i) => (
          <motion.div key={i} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3+i*0.1 }} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:999, fontSize:12, fontWeight:600, background:"rgba(108,142,255,0.1)", color:isLight?"#6C8EFF":"#B8A9FF", border:"1px solid rgba(184,169,255,0.2)" }}>
            {badge.icon}{badge.label}
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.4 }}>
        <h1 style={{ fontSize:"clamp(42px,8vw,80px)", fontWeight:800, lineHeight:1.1, marginBottom:16, color:isLight?"#1a1a2e":"#ffffff", fontFamily:"Nunito,sans-serif" }}>
          Laboratoire<br />
          <span style={{ background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Informatique</span>
        </h1>
      </motion.div>
      <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.6 }} style={{ fontSize:22, fontWeight:700, marginBottom:16, letterSpacing:4, textTransform:"uppercase", color:"#6C8EFF" }}>ETS ZAIMI</motion.p>
      <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.7 }} style={{ fontSize:17, maxWidth:600, lineHeight:1.8, marginBottom:40, color:isLight?"#6b7280":"rgba(232,240,255,0.6)", fontFamily:"Nunito,sans-serif" }}>
        We sell, we fix, and we build the intelligence of tomorrow. Your complete IT partner from networks and cybersecurity to AI systems and hardware repair.
      </motion.p>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.9 }} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16, marginBottom:64 }}>
        <a href="#services" style={{ padding:"12px 32px", borderRadius:999, fontWeight:700, fontSize:14, color:"white", textDecoration:"none", background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", boxShadow:"0 8px 30px rgba(108,142,255,0.3)" }}>Explore Services</a>
        <a href="#contact" style={{ padding:"12px 32px", borderRadius:999, fontWeight:700, fontSize:14, textDecoration:"none", border:"2px solid rgba(184,169,255,0.4)", color:isLight?"#6C8EFF":"#B8A9FF" }}>Contact Us</a>
      </motion.div>
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:1.1 }} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16, marginBottom:64 }}>
        {stats.map((stat, i) => (
          <motion.div key={i} animate={{ y:[0,-8,0] }} transition={{ duration:3+i*0.5, repeat:Infinity, ease:"easeInOut", delay:i*0.3 }} style={{ padding:"16px 24px", borderRadius:20, textAlign:"center", minWidth:100, background:isLight?"rgba(255,255,255,0.7)":"rgba(108,142,255,0.05)", backdropFilter:"blur(12px)", border:isLight?"1px solid rgba(108,142,255,0.2)":"1px solid rgba(184,169,255,0.15)", boxShadow:"0 0 30px rgba(108,142,255,0.15)" }}>
            <p style={{ fontSize:26, fontWeight:800, color:"#6C8EFF" }}>{stat.number}</p>
            <p style={{ fontSize:11, fontWeight:600, marginTop:4, color:isLight?"#9ca3af":"rgba(232,240,255,0.5)" }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }} style={{ position:"absolute", bottom:32 }}>
        <a href="#services"><ChevronDown size={28} color={isLight?"rgba(108,142,255,0.5)":"rgba(184,169,255,0.4)"} /></a>
      </motion.div>
    </section>
  );
}
`;

const services = `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Shield, Brain, Camera, Wrench, ChevronDown } from "lucide-react";

const servicesData = [
  { id:1, icon:"network", title:"Networking", subtitle:"LAN, MAN, WLAN, IoT & Core Infrastructure", color:"#6C8EFF", items:[{ name:"IP Address Management", desc:"DHCP, DNS, dynamic address assignment and hostname resolution." },{ name:"Routing & Switching", desc:"OSPF, EIGRP, BGP routing protocols and VLAN segmentation." },{ name:"Firewall & UTM", desc:"Stateful Packet Inspection, Deep Packet Inspection, Content Filtering." },{ name:"VPN Services", desc:"Site-to-Site and Remote Access VPNs using IPsec, OpenVPN, WireGuard." },{ name:"IDS/IPS", desc:"Intrusion detection and prevention using Snort and Suricata." },{ name:"Network Simulation", desc:"Cisco Packet Tracer, GNS3, EVE-NG virtual lab environments." }]},
  { id:2, icon:"shield", title:"Cybersecurity", subtitle:"Data Protection, SOC & Adversarial Simulation", color:"#B8A9FF", items:[{ name:"Encryption & PKI", desc:"SSL/TLS, BitLocker, LUKS, internal Certificate Authority hosting." },{ name:"Data Loss Prevention", desc:"DLP policies to detect and block unauthorized data transfers." },{ name:"SIEM & Log Management", desc:"Splunk, Elastic Security, Wazuh for centralized threat detection." },{ name:"Vulnerability Assessment", desc:"Nessus, OpenVAS, Qualys scanners for finding weaknesses." },{ name:"Penetration Testing", desc:"Safe Kali Linux, Metasploit, Nmap ethical hacking sandbox." },{ name:"Malware Analysis", desc:"Air-gapped environments to safely detonate and analyze malware." }]},
  { id:3, icon:"brain", title:"AI Services", subtitle:"Agents, CyberAI & MLOps", color:"#89CFF0", items:[{ name:"AI Agent Development", desc:"CrewAI, AutoGen, LangGraph multi-agent execution environments." },{ name:"Tool & API Sandbox", desc:"Mock environments to test AI agents solving multi-step problems." },{ name:"AI-Powered Log Analysis", desc:"ML models scanning network traffic to detect micro-anomalies." },{ name:"Autonomous Incident Response", desc:"Agents that detect intrusions and autonomously apply firewall rules." },{ name:"MLOps & Model Tracking", desc:"MLflow, Weights & Biases for model versioning and pipelines." },{ name:"LoRA Fine-tuning", desc:"Continuous fine-tuning pipelines for open-source models." }]},
  { id:4, icon:"camera", title:"IoT & CCTV", subtitle:"Smart Infrastructure & Surveillance", color:"#98FB98", items:[{ name:"CCTV Installation", desc:"Professional camera placement, configuration and monitoring setup." },{ name:"IoT Network Design", desc:"Secure IoT device onboarding, segmentation and management." },{ name:"Smart Home & Office", desc:"Automated infrastructure solutions for homes and businesses." },{ name:"Remote Monitoring", desc:"24/7 remote access and alert systems for your infrastructure." }]},
  { id:5, icon:"wrench", title:"Hardware Repair", subtitle:"PC, Laptop & Network Equipment", color:"#FFB347", items:[{ name:"Component-Level Repair", desc:"Micro-soldering, BGA reballing, logic board short circuit diagnosis." },{ name:"Network Hardware", desc:"PSU recapping, EEPROM flashing, RJ45 port resoldering on switches." },{ name:"Screen & Chassis", desc:"LCD replacement, hinge repair, DC jack repair for laptops." },{ name:"Thermal Maintenance", desc:"Cooling system cleaning, fan replacement, thermal paste application." },{ name:"PC & Laptop Sales", desc:"Gaming PCs, laptops, gaming laptops sold, configured and ready." },{ name:"Diagnostic Tools", desc:"Oscilloscope, multimeter, DC bench power supply, rework stations." }]},
];

const iconMap = { network:<Network size={28} />, shield:<Shield size={28} />, brain:<Brain size={28} />, camera:<Camera size={28} />, wrench:<Wrench size={28} /> };

export default function Services({ isLight }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <section id="services" style={{ position:"relative", zIndex:10, padding:"100px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#6C8EFF", marginBottom:12 }}>What We Offer</p>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", fontFamily:"Nunito,sans-serif" }}>Our <span style={{ background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Services</span></h2>
          <p style={{ fontSize:16, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", marginTop:16, maxWidth:500, margin:"16px auto 0" }}>Click any service to explore what we can do for you</p>
        </motion.div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {servicesData.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}>
              <div onClick={() => toggle(service.id)} style={{ cursor:"pointer", borderRadius:20, border:openId===service.id?"1px solid "+service.color+"60":isLight?"1px solid rgba(108,142,255,0.15)":"1px solid rgba(184,169,255,0.1)", background:openId===service.id?isLight?"rgba(255,255,255,0.9)":"rgba(108,142,255,0.07)":isLight?"rgba(255,255,255,0.6)":"rgba(108,142,255,0.03)", backdropFilter:"blur(12px)", boxShadow:openId===service.id?"0 0 30px "+service.color+"20":"none", transition:"all 0.3s ease", overflow:"hidden" }}>
                <div style={{ padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:service.color+"20", display:"flex", alignItems:"center", justifyContent:"center", color:service.color, flexShrink:0 }}>{iconMap[service.icon]}</div>
                    <div>
                      <h3 style={{ fontSize:18, fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", margin:0 }}>{service.title}</h3>
                      <p style={{ fontSize:13, color:isLight?"#9ca3af":"rgba(232,240,255,0.5)", margin:"4px 0 0" }}>{service.subtitle}</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate:openId===service.id?180:0 }} transition={{ duration:0.3 }} style={{ color:service.color, flexShrink:0 }}><ChevronDown size={22} /></motion.div>
                </div>
                <AnimatePresence>
                  {openId===service.id && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:"easeInOut" }} style={{ overflow:"hidden" }}>
                      <div style={{ padding:"0 28px 28px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
                        {service.items.map((item, j) => (
                          <motion.div key={j} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:j*0.05 }} style={{ padding:"14px 16px", borderRadius:12, background:isLight?"rgba(108,142,255,0.05)":"rgba(255,255,255,0.03)", border:"1px solid "+service.color+"25" }}>
                            <p style={{ fontSize:13, fontWeight:700, color:service.color, margin:"0 0 6px" }}>{item.name}</p>
                            <p style={{ fontSize:12, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", margin:0, lineHeight:1.6 }}>{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const products = `"use client";
import { motion } from "framer-motion";
import { Monitor, Laptop, Network, Cpu, Camera, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  { slug:"desktops", icon:"monitor", title:"Desktop PCs", subtitle:"Gaming & Professional", color:"#6C8EFF", desc:"High-performance desktop computers for gaming, work, and everything in between." },
  { slug:"laptops", icon:"laptop", title:"Laptops", subtitle:"Standard & Gaming", color:"#B8A9FF", desc:"Wide range of laptops from everyday use to high-end gaming machines." },
  { slug:"networking", icon:"network", title:"Network Equipment", subtitle:"Routers, Switches & More", color:"#89CFF0", desc:"Enterprise and home networking gear — routers, switches, access points and cabling." },
  { slug:"components", icon:"cpu", title:"PC Components", subtitle:"Build Your Own", color:"#98FB98", desc:"CPUs, GPUs, RAM, SSDs, motherboards and more." },
  { slug:"cctv", icon:"camera", title:"CCTV & IoT", subtitle:"Surveillance & Smart Devices", color:"#FFB347", desc:"Security cameras, NVR systems, smart home devices and IoT sensors." },
  { slug:"tools", icon:"wrench", title:"Tools & Accessories", subtitle:"Professional Grade", color:"#FF8FAB", desc:"Network tools, crimpers, testers, soldering stations and repair equipment." },
];

const iconMap = { monitor:<Monitor size={32} />, laptop:<Laptop size={32} />, network:<Network size={32} />, cpu:<Cpu size={32} />, camera:<Camera size={32} />, wrench:<Wrench size={32} /> };

export default function Products({ isLight }) {
  const router = useRouter();
  return (
    <section id="products" style={{ position:"relative", zIndex:10, padding:"100px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#6C8EFF", marginBottom:12 }}>What We Sell</p>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", fontFamily:"Nunito,sans-serif" }}>Our <span style={{ background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Products</span></h2>
          <p style={{ fontSize:16, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", marginTop:16, maxWidth:500, margin:"16px auto 0" }}>Click a category to browse — contact us for pricing</p>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
          {categories.map((cat, i) => (
            <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }} whileHover={{ y:-6, transition:{ duration:0.2 } }} onClick={() => router.push("/products/"+cat.slug)} style={{ padding:"28px", borderRadius:24, background:isLight?"rgba(255,255,255,0.7)":"rgba(108,142,255,0.04)", backdropFilter:"blur(12px)", border:isLight?"1px solid rgba(108,142,255,0.15)":"1px solid rgba(184,169,255,0.1)", cursor:"pointer", transition:"box-shadow 0.3s" }} onMouseEnter={e => e.currentTarget.style.boxShadow="0 0 30px "+cat.color+"25"} onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
              <div style={{ width:60, height:60, borderRadius:16, background:cat.color+"20", display:"flex", alignItems:"center", justifyContent:"center", color:cat.color, marginBottom:20 }}>{iconMap[cat.icon]}</div>
              <h3 style={{ fontSize:18, fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", margin:"0 0 4px" }}>{cat.title}</h3>
              <p style={{ fontSize:12, fontWeight:700, color:cat.color, margin:"0 0 12px", textTransform:"uppercase", letterSpacing:2 }}>{cat.subtitle}</p>
              <p style={{ fontSize:14, color:isLight?"#6b7280":"rgba(232,240,255,0.55)", margin:0, lineHeight:1.7 }}>{cat.desc}</p>
              <div style={{ marginTop:20, display:"inline-flex", alignItems:"center", gap:6, padding:"8px 18px", borderRadius:999, fontSize:12, fontWeight:700, color:cat.color, background:cat.color+"15", border:"1px solid "+cat.color+"30" }}>Browse Category →</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const categoryPage = `"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Phone } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categoryInfo = {
  desktops: { title:"Desktop PCs", subtitle:"Gaming & Professional Desktops", color:"#6C8EFF", emoji:"🖥️" },
  laptops: { title:"Laptops", subtitle:"Standard & Gaming Laptops", color:"#B8A9FF", emoji:"💻" },
  networking: { title:"Network Equipment", subtitle:"Routers, Switches & Infrastructure", color:"#89CFF0", emoji:"🌐" },
  components: { title:"PC Components", subtitle:"Build Your Own Machine", color:"#98FB98", emoji:"⚙️" },
  cctv: { title:"CCTV & IoT", subtitle:"Surveillance & Smart Devices", color:"#FFB347", emoji:"📷" },
  tools: { title:"Tools & Accessories", subtitle:"Professional Grade Equipment", color:"#FF8FAB", emoji:"🔧" },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const info = categoryInfo[slug] || { title:"Category", subtitle:"", color:"#6C8EFF", emoji:"📦" };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("products").select("*").eq("category", slug).eq("in_stock", true);
      setProducts(data || []);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  return (
    <main style={{ minHeight:"100vh", backgroundColor:"#080818", color:"#E8F0FF", fontFamily:"Nunito,sans-serif" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"40px 24px" }}>
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}>
          <Link href="/#products" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(108,142,255,0.1)", border:"1px solid rgba(108,142,255,0.2)", color:"#6C8EFF", padding:"10px 20px", borderRadius:999, fontSize:14, fontWeight:700, textDecoration:"none", marginBottom:48, cursor:"pointer" }}>
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </motion.div>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ fontSize:64, marginBottom:16 }}>{info.emoji}</div>
          <h1 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:"#ffffff", marginBottom:8 }}>{info.title}</h1>
          <p style={{ fontSize:16, color:"rgba(232,240,255,0.5)" }}>{info.subtitle}</p>
        </motion.div>
        {loading && <p style={{ textAlign:"center", color:"rgba(232,240,255,0.4)" }}>Loading...</p>}
        {!loading && products.length === 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} style={{ textAlign:"center", padding:"60px 40px", borderRadius:24, background:"rgba(108,142,255,0.04)", border:"1px solid rgba(184,169,255,0.1)", backdropFilter:"blur(12px)" }}>
            <Package size={48} color={info.color} style={{ margin:"0 auto 20px", display:"block" }} />
            <h2 style={{ fontSize:24, fontWeight:800, color:"#ffffff", marginBottom:12 }}>Products Coming Soon</h2>
            <p style={{ fontSize:15, color:"rgba(232,240,255,0.5)", maxWidth:400, margin:"0 auto 32px", lineHeight:1.8 }}>Contact us directly and we will find exactly what you need.</p>
            <a href="mailto:etszaimi7@gmail.com" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", borderRadius:999, fontWeight:700, fontSize:15, color:"white", textDecoration:"none", background:"linear-gradient(to right,"+info.color+",#B8A9FF)" }}>
              <Phone size={16} /> Contact Us
            </a>
          </motion.div>
        )}
        {!loading && products.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24 }}>
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }} style={{ borderRadius:20, overflow:"hidden", background:"rgba(108,142,255,0.04)", border:"1px solid rgba(184,169,255,0.1)", backdropFilter:"blur(12px)" }}>
                {p.image_url && <img src={p.image_url} alt={p.name} style={{ width:"100%", height:200, objectFit:"cover" }} />}
                <div style={{ padding:"20px" }}>
                  <h3 style={{ fontSize:16, fontWeight:800, color:"#ffffff", margin:"0 0 6px" }}>{p.name}</h3>
                  {p.description && <p style={{ fontSize:13, color:"rgba(232,240,255,0.5)", margin:"0 0 12px", lineHeight:1.6 }}>{p.description}</p>}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:16, fontWeight:800, color:info.color }}>{p.price || "Contact for price"}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:"#98FB98", background:"rgba(152,251,152,0.1)", padding:"4px 10px", borderRadius:999 }}>In Stock</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
`;

const repair = `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wifi, Smartphone, HardDrive, ChevronDown } from "lucide-react";

const repairData = [
  { id:1, icon:"monitor", title:"PC & Laptop Repair", subtitle:"Component-level diagnostics and repair", color:"#6C8EFF", items:[{ name:"Micro-Soldering & Logic Board", desc:"Pinpointing short circuits on motherboards, replacing resistors, capacitors and ICs." },{ name:"BGA Reballing / Reflow", desc:"Fixing broken solder balls under processors or GPU chips caused by heat stress." },{ name:"Screen & Chassis Overhaul", desc:"Cracked LCD panels, broken laptop hinges, and DC jack repair." },{ name:"Thermal Maintenance", desc:"De-dusting cooling systems, replacing fans, applying high-performance thermal paste." },{ name:"Data Recovery", desc:"Recovering data from failed HDDs, SSDs, and corrupted storage devices." },{ name:"OS Installation & Config", desc:"Windows, Linux installation, driver setup, software configuration." }]},
  { id:2, icon:"wifi", title:"Network Hardware Repair", subtitle:"Switches, routers, modems & access points", color:"#B8A9FF", items:[{ name:"PSU Recapping", desc:"Replacing blown or leaking capacitors on internal power supply boards of switches." },{ name:"Console Recovery & EEPROM", desc:"Rewriting corrupt firmware directly onto storage chips for boot-looping devices." },{ name:"Port Resoldering", desc:"Repairing broken RJ45 Ethernet ports and damaged SFP fiber transceiver cages." },{ name:"Firmware Updates", desc:"Updating router and switch firmware to fix vulnerabilities and restore functionality." },{ name:"Configuration Restore", desc:"Factory reset, reconfiguration and full setup of enterprise networking equipment." }]},
  { id:3, icon:"smartphone", title:"Mobile & Tablet Repair", subtitle:"Screens, batteries & charging ports", color:"#89CFF0", items:[{ name:"Screen Replacement", desc:"LCD and OLED screen replacement for all major brands." },{ name:"Battery Replacement", desc:"Genuine capacity batteries with professional installation and calibration." },{ name:"Charging Port Repair", desc:"USB-C, micro-USB and Lightning port cleaning, repair or replacement." },{ name:"Water Damage Treatment", desc:"Ultrasonic cleaning and component-level repair for water-damaged devices." }]},
  { id:4, icon:"harddrive", title:"Storage & Data Services", subtitle:"HDD, SSD recovery and cloning", color:"#98FB98", items:[{ name:"HDD & SSD Recovery", desc:"Professional data recovery from physically damaged or logically corrupt drives." },{ name:"Drive Cloning", desc:"Migrating your entire system to a new faster SSD without reinstalling anything." },{ name:"RAID Recovery", desc:"Reconstructing failed RAID arrays and recovering data from degraded sets." },{ name:"Secure Data Wiping", desc:"DOD-grade secure erasure of sensitive data before device resale or disposal." }]},
];

const iconMap = { monitor:<Monitor size={28} />, wifi:<Wifi size={28} />, smartphone:<Smartphone size={28} />, harddrive:<HardDrive size={28} /> };

export default function Repair({ isLight }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <section id="repair" style={{ position:"relative", zIndex:10, padding:"100px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#6C8EFF", marginBottom:12 }}>Service Apres-Vente</p>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", fontFamily:"Nunito,sans-serif" }}>Repair <span style={{ background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Services</span></h2>
          <p style={{ fontSize:16, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", marginTop:16, maxWidth:500, margin:"16px auto 0" }}>Professional diagnostics and repair — click to see what we fix</p>
        </motion.div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {repairData.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}>
              <div onClick={() => toggle(service.id)} style={{ cursor:"pointer", borderRadius:20, border:openId===service.id?"1px solid "+service.color+"60":isLight?"1px solid rgba(108,142,255,0.15)":"1px solid rgba(184,169,255,0.1)", background:openId===service.id?isLight?"rgba(255,255,255,0.9)":"rgba(108,142,255,0.07)":isLight?"rgba(255,255,255,0.6)":"rgba(108,142,255,0.03)", backdropFilter:"blur(12px)", boxShadow:openId===service.id?"0 0 30px "+service.color+"20":"none", transition:"all 0.3s ease", overflow:"hidden" }}>
                <div style={{ padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:service.color+"20", display:"flex", alignItems:"center", justifyContent:"center", color:service.color, flexShrink:0 }}>{iconMap[service.icon]}</div>
                    <div>
                      <h3 style={{ fontSize:18, fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", margin:0 }}>{service.title}</h3>
                      <p style={{ fontSize:13, color:isLight?"#9ca3af":"rgba(232,240,255,0.5)", margin:"4px 0 0" }}>{service.subtitle}</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate:openId===service.id?180:0 }} transition={{ duration:0.3 }} style={{ color:service.color, flexShrink:0 }}><ChevronDown size={22} /></motion.div>
                </div>
                <AnimatePresence>
                  {openId===service.id && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:"easeInOut" }} style={{ overflow:"hidden" }}>
                      <div style={{ padding:"0 28px 28px", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
                        {service.items.map((item, j) => (
                          <motion.div key={j} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:j*0.05 }} style={{ padding:"14px 16px", borderRadius:12, background:isLight?"rgba(108,142,255,0.05)":"rgba(255,255,255,0.03)", border:"1px solid "+service.color+"25" }}>
                            <p style={{ fontSize:13, fontWeight:700, color:service.color, margin:"0 0 6px" }}>{item.name}</p>
                            <p style={{ fontSize:12, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", margin:0, lineHeight:1.6 }}>{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

const contact = `"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact({ isLight }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!form.name || !form.message) return;
    setLoading(true);
    await supabase.from("messages").insert([form]);
    setSent(true);
    setLoading(false);
    setForm({ name:"", email:"", phone:"", message:"" });
  };

  return (
    <section id="contact" style={{ position:"relative", zIndex:10, padding:"100px 24px 60px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ textAlign:"center", marginBottom:60 }}>
          <p style={{ fontSize:13, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:"#6C8EFF", marginBottom:12 }}>Get In Touch</p>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", fontFamily:"Nunito,sans-serif" }}>Contact <span style={{ background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Us</span></h2>
          <p style={{ fontSize:16, color:isLight?"#6b7280":"rgba(232,240,255,0.5)", marginTop:16 }}>We are here for you — reach out anytime</p>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:20, marginBottom:48 }}>
          {[
            { icon:<Phone size={22} />, label:"Phone", value:"+213 XX XXX XXXX", color:"#6C8EFF" },
            { icon:<Mail size={22} />, label:"Email", value:"etszaimi7@gmail.com", color:"#B8A9FF" },
            { icon:<MapPin size={22} />, label:"Location", value:"Mila, Algeria", color:"#89CFF0" },
            { icon:<MessageCircle size={22} />, label:"WhatsApp", value:"Message us directly", color:"#98FB98" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }} style={{ padding:"24px 20px", borderRadius:20, textAlign:"center", background:isLight?"rgba(255,255,255,0.7)":"rgba(108,142,255,0.04)", backdropFilter:"blur(12px)", border:isLight?"1px solid rgba(108,142,255,0.15)":"1px solid rgba(184,169,255,0.1)" }}>
              <div style={{ width:48, height:48, borderRadius:14, background:item.color+"20", display:"flex", alignItems:"center", justifyContent:"center", color:item.color, margin:"0 auto 14px" }}>{item.icon}</div>
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:2, color:item.color, margin:"0 0 6px" }}>{item.label}</p>
              <p style={{ fontSize:14, fontWeight:600, color:isLight?"#1a1a2e":"#ffffff", margin:0 }}>{item.value}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ padding:"40px", borderRadius:24, background:isLight?"rgba(255,255,255,0.7)":"rgba(108,142,255,0.04)", backdropFilter:"blur(12px)", border:isLight?"1px solid rgba(108,142,255,0.15)":"1px solid rgba(184,169,255,0.1)" }}>
          <h3 style={{ fontSize:22, fontWeight:800, color:isLight?"#1a1a2e":"#ffffff", margin:"0 0 24px" }}>Send us a message</h3>
          {sent ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
              <p style={{ fontSize:18, fontWeight:700, color:"#98FB98" }}>Message sent successfully!</p>
              <p style={{ fontSize:14, color:"rgba(232,240,255,0.5)", marginTop:8 }}>We will get back to you soon.</p>
              <button onClick={() => setSent(false)} style={{ marginTop:20, padding:"10px 24px", borderRadius:999, fontSize:13, fontWeight:700, color:"#6C8EFF", background:"rgba(108,142,255,0.1)", border:"1px solid rgba(108,142,255,0.2)", cursor:"pointer" }}>Send another</button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }}>
              <input placeholder="Your name *" value={form.name} onChange={e => setForm({...form, name:e.target.value})} style={{ padding:"14px 16px", borderRadius:12, border:"1px solid rgba(108,142,255,0.2)", background:isLight?"rgba(255,255,255,0.8)":"rgba(108,142,255,0.05)", color:isLight?"#1a1a2e":"#ffffff", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none" }} />
              <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} style={{ padding:"14px 16px", borderRadius:12, border:"1px solid rgba(108,142,255,0.2)", background:isLight?"rgba(255,255,255,0.8)":"rgba(108,142,255,0.05)", color:isLight?"#1a1a2e":"#ffffff", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none" }} />
              <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} style={{ padding:"14px 16px", borderRadius:12, border:"1px solid rgba(108,142,255,0.2)", background:isLight?"rgba(255,255,255,0.8)":"rgba(108,142,255,0.05)", color:isLight?"#1a1a2e":"#ffffff", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none" }} />
              <textarea placeholder="Your message *" value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={3} style={{ padding:"14px 16px", borderRadius:12, border:"1px solid rgba(108,142,255,0.2)", background:isLight?"rgba(255,255,255,0.8)":"rgba(108,142,255,0.05)", color:isLight?"#1a1a2e":"#ffffff", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none", resize:"none", gridColumn:"1/-1" }} />
              <button onClick={handleSend} disabled={loading} style={{ gridColumn:"1/-1", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, padding:"14px 32px", borderRadius:999, fontWeight:700, fontSize:15, color:"white", background:"linear-gradient(to right,#6C8EFF,#B8A9FF)", border:"none", cursor:"pointer", boxShadow:"0 8px 30px rgba(108,142,255,0.3)" }}>
                <Send size={16} /> {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          )}
        </motion.div>
        <p style={{ textAlign:"center", marginTop:48, fontSize:13, color:isLight?"#9ca3af":"rgba(232,240,255,0.3)" }}>
          ETS ZAIMI — Laboratoire Informatique © 2026. All rights reserved.
        </p>
      </div>
    </section>
  );
}
`;

const page = `"use client";
import { useState, useEffect } from "react";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Repair from "@/components/Repair";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLight, setIsLight] = useState(false);
  const toggleTheme = () => setIsLight((prev) => !prev);
  useEffect(() => {
    if (isLight) document.body.classList.add("light-mode");
    else document.body.classList.remove("light-mode");
  }, [isLight]);
  return (
    <main style={{ position:"relative", minHeight:"100vh", backgroundColor:isLight?"#F8F8FF":"#080818", color:isLight?"#1a1a2e":"#E8F0FF", transition:"all 0.5s" }}>
      {!isLight && <StarField />}
      {isLight && <div style={{ position:"fixed", inset:0, zIndex:0, background:"radial-gradient(ellipse at 20% 50%,rgba(108,142,255,0.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(184,169,255,0.06) 0%,transparent 60%)" }} />}
      <Navbar isLight={isLight} toggleTheme={toggleTheme} />
      <Hero isLight={isLight} />
      <Services isLight={isLight} />
      <Products isLight={isLight} />
      <Repair isLight={isLight} />
      <Contact isLight={isLight} />
    </main>
  );
}
`;

if (!fs.existsSync("app/products")) fs.mkdirSync("app/products", { recursive: true });
if (!fs.existsSync("app/products/[slug]")) fs.mkdirSync("app/products/[slug]", { recursive: true });
if (!fs.existsSync("app/admin")) fs.mkdirSync("app/admin", { recursive: true });
if (!fs.existsSync("lib")) fs.mkdirSync("lib", { recursive: true });

fs.writeFileSync("app/globals.css", globals);
fs.writeFileSync("lib/supabase.ts", supabaseLib);
fs.writeFileSync("components/StarField.tsx", starfield);
fs.writeFileSync("components/Navbar.tsx", navbar);
fs.writeFileSync("components/Hero.tsx", hero);
fs.writeFileSync("components/Services.tsx", services);
fs.writeFileSync("components/Products.tsx", products);
fs.writeFileSync("components/Repair.tsx", repair);
fs.writeFileSync("components/Contact.tsx", contact);
fs.writeFileSync("app/products/[slug]/page.tsx", categoryPage);
fs.writeFileSync("app/admin/page.tsx", adminPage);
fs.writeFileSync("app/page.tsx", page);

console.log("All 12 files written successfully!");