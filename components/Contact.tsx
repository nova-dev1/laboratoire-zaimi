"use client";
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
