"use client";
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
