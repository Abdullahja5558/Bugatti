"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const springConfig = { stiffness: 45, damping: 25, mass: 1.5 };
  
  // Dynamic Width aur Padding for Centering on Scroll
  const navWidth = useSpring(useTransform(scrollY, [0, 100], ["100%", "90%"]), springConfig);
  const navTop = useSpring(useTransform(scrollY, [0, 100], [0, 20]), springConfig);
  const borderRadius = useSpring(useTransform(scrollY, [0, 100], [0, 100]), springConfig);

  // Existing animations
  const navHeight = useSpring(useTransform(scrollY, [0, 100], [120, 80]), springConfig);
  const logoScale = useSpring(useTransform(scrollY, [0, 100], [1, 0.75]), springConfig);
  const glassOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 20]);

  // Premium Edge Effects on Scroll
  const edgeBorderOpacity = useTransform(scrollY, [0, 100], [0, 0.12]);
  const edgeShadowOpacity = useTransform(scrollY, [0, 100], [0, 0.4]);

  const navLinks = [
    { label: "Chiron", side: "left", href: "#chiron" },
    { label: "Vitesse", side: "left", href: "#vitesse" },
    { label: "Engineering", side: "left", href: "#engineering" },
    { label: "Heritage", side: "right", href: "#heritage" },
    { label: "Cockpit", side: "right", href: "#cockpit" },
    { label: "Signature", side: "right", href: "#signature" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-100 pointer-events-none">
      <motion.nav
        style={{ 
          height: navHeight,
          width: navWidth,
          top: navTop,
          borderRadius: borderRadius,
          boxShadow: `0 20px 50px rgba(0,0,0,${edgeShadowOpacity})`
        }}
        className="relative flex items-center justify-center px-6 md:px-12 transition-colors duration-500 overflow-hidden pointer-events-auto"
      >
        {/* BACKGROUND MATERIAL */}
        <motion.div 
          style={{ 
            opacity: glassOpacity, 
            backdropFilter: `blur(${blurValue}px)`,
            borderRadius: borderRadius,
            border: `1px solid rgba(255, 255, 255, ${edgeBorderOpacity})`
          }}
          className="absolute inset-0 -z-10"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-[#050505]/60 rounded-[inherit]" />
          
          {/* Top Edge Shine (Automotive Luxury Look) */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
          
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-[inherit]" />
        </motion.div>

        <div className="w-full max-w-400 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          
          {/* DESKTOP LEFT */}
          <div className="hidden md:flex items-center justify-start gap-x-8 lg:gap-x-12">
            {navLinks.filter(l => l.side === "left").map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* LOGO */}
          <motion.div 
            style={{ scale: logoScale }}
            className="flex justify-center z-50"
          >
            <div className="relative w-16 h-10 md:w-32 md:h-20 flex items-center justify-center group cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain filter brightness-110"
              />
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </motion.div>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center justify-end gap-x-8 lg:gap-x-12">
            {navLinks.filter(l => l.side === "right").map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2 text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed top-0 left-0 w-full bg-[#050505] flex flex-col items-center justify-center gap-y-8 z-40"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-extralight tracking-[0.3em] uppercase text-white/60 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

// NavLink Component with Href support
const NavLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <motion.a 
      href={href} 
      className="relative group block py-2"
    >
      <span className="text-[10px] lg:text-[11px] font-light tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-all duration-700 ease-out">
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:w-full" />
    </motion.a>
  );
};

export default Navbar;