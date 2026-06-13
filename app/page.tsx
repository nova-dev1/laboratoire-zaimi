"use client";
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
