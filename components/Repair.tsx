"use client";
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
