"use client";
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
