"use client";
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
