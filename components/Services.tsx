"use client";
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
