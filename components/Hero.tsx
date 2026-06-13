"use client";
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
