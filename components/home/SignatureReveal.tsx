"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SignatureReveal = () => {
  const [isHovered, setIsHovered] = useState(false);
  const title = "Bugatti Chiron";

  return (
    <section 
      className="relative h-screen w-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
      id="signature"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CONTINUOUS ATMOSPHERIC LIGHT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* The Constant Pulse */}
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" 
        />
      </div>

      {/* THE SIGNATURE */}
      <div className="relative z-10 flex flex-col items-center select-none">
        <motion.h2 
          animate={{
            opacity: isHovered ? 1 : 0.25,
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -10 : 0
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-5xl md:text-8xl font-medium text-center"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {title}
        </motion.h2>

        {/* ELEGANT PEN-STROKE UNDERLINE */}
        <motion.div 
          animate={{ 
            width: isHovered ? "80%" : "0px",
            opacity: isHovered ? 0.5 : 0 
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-px bg-linear-to-r from-transparent via-white to-transparent mt-4"
        />
      </div>

      {/* MINIMALIST FOOTER */}
      <div className="absolute bottom-8 w-full flex justify-between px-12 opacity-20 text-[8px] tracking-[0.5em] uppercase text-white font-sans font-extralight">
        <span>Molsheim, France</span>
        <span>© 2026 Bugatti Automobiles S.A.S.</span>
      </div>

      {/* INTERACTION HINT */}
      <motion.div 
        animate={{ opacity: isHovered ? 0 : 0.4 }}
        className="absolute bottom-24 text-[9px] tracking-[1em] text-white/60 uppercase font-sans font-extralight"
      >
        Revelare
      </motion.div>
    </section>
  );
};

export default SignatureReveal;