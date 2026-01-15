"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lenis } from "lenis/react";

const VitesseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // PHYSICS: The "Hydraulic" feel — heavy, smooth, and expensive.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 12,
    damping: 35,
    mass: 2.5
  });

  // IMAGE KINETICS: Instant Reveal (5%) & Cinematic Shutter Exit (75%)
  const imageOpacity = useTransform(smoothProgress, [0, 0.05, 0.2, 0.7, 0.8], [0, 0, 1, 1, 0]);
  const imageScale = useTransform(smoothProgress, [0.05, 0.25, 0.7, 0.85], [0.85, 0.98, 1, 1.1]);
  const imageBlur = useTransform(smoothProgress, [0, 0.1, 0.7, 0.8], ["30px", "0px", "0px", "50px"]);

  return (
    <Lenis root options={{ lerp: 0.04, duration: 2, smoothWheel: true }}>
      <div ref={containerRef} className="relative h-[900vh] bg-[#000000] overflow-clip" id="vitesse">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          
          {/* 1. ATMOSPHERIC VOID */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Surgical Overhead Light */}
            <div className="absolute top-0 w-full h-[45vh] bg-linear-to-b from-white/4 to-transparent blur-[80px]" />
            {/* Subtle Radial Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
          </div>

          {/* 2. THE MACHINE: Materializing Sculpture */}
          <motion.div 
            style={{ 
              opacity: imageOpacity, 
              scale: imageScale,
              filter: `blur(${imageBlur})`
            }}
            className="relative z-20 w-full max-w-237.5 px-8 pointer-events-none will-change-transform"
          >
            <img 
              src="/meter.png" 
              alt="Bugatti Vitesse" 
              className="w-full h-auto object-contain contrast-[1.1] brightness-[1.05]"
            />
            {/* Dynamic Light Floor Reflection */}
            <motion.div 
              style={{ opacity: useTransform(imageOpacity, [0, 1], [0, 0.4]) }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-4 bg-white/10 blur-[90px] rounded-full" 
            />
          </motion.div>

          {/* 3. THE BLUEPRINT SPECS (New HUD Design) */}
          <div className="absolute inset-0 z-40 flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-32 pointer-events-none">
            
            {/* Left Specs: Chronograph Style */}
            <div className="flex flex-col gap-48 items-start">
              <BlueprintSpec 
                id="01" 
                label="ACCEL." 
                value="2.4" 
                unit="SEC"
                progress={smoothProgress} 
                range={[0.15, 0.35]} 
              />
              <BlueprintSpec 
                id="02" 
                label="FORCE" 
                value="1600" 
                unit="NM"
                progress={smoothProgress} 
                range={[0.45, 0.65]} 
              />
            </div>

            {/* Right Specs: Chronograph Style */}
            <div className="flex flex-col gap-48 items-end text-right">
              <BlueprintSpec 
                id="03" 
                label="SPEED" 
                value="420" 
                unit="KM/H"
                progress={smoothProgress} 
                range={[0.25, 0.45]} 
                align="right"
              />
              <BlueprintSpec 
                id="04" 
                label="ENGINE" 
                value="W16" 
                unit="QUAD"
                progress={smoothProgress} 
                range={[0.55, 0.75]} 
                align="right"
              />
            </div>
          </div>

          {/* 4. TECHNICAL AXIS Progress Line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-20">
             <div className="w-px h-20 bg-linear-to-t from-white to-transparent" />
             <span className="text-[6px] tracking-[1.5em] text-white uppercase ml-[1.5em]">Atelier // Heritage</span>
          </div>

        </div>
      </div>
    </Lenis>
  );
};

const BlueprintSpec = ({ id, label, value, unit, progress, range, align = "left" }: any) => {
  const isRight = align === "right";
  
  // ANIMATIONS
  const opacity = useTransform(progress, [range[0], range[0] + 0.08, range[1] - 0.08, range[1]], [0, 1, 1, 0]);
  const yMove = useTransform(progress, [range[0], range[1]], [20, -20]);
  const rotateHUD = useTransform(progress, [range[0], range[1]], [0, 90]);

  return (
    <motion.div 
      style={{ opacity, y: yMove }} 
      className={`flex flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}
    >
      {/* HUD Circle & Label */}
      <div className={`flex items-center gap-4 mb-4 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        <div className="relative flex items-center justify-center">
            <motion.div 
                style={{ rotate: rotateHUD }}
                className="w-10 h-10 border-[0.5px] border-dashed border-white/20 rounded-full" 
            />
            <span className="absolute text-[7px] font-mono text-white/40">{id}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase">{label}</span>
            <div className={`h-px w-8 bg-white/10 mt-1 ${isRight ? "ml-auto" : ""}`} />
        </div>
      </div>
      
      {/* Value Block */}
      <div className={`flex items-baseline gap-2 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        <h3 className="text-4xl md:text-7xl font-thin tracking-tighter text-white uppercase leading-none">
          {value}
        </h3>
        <span className="text-[10px] md:text-xs font-mono text-white/20 tracking-widest mb-1 italic">
          {unit}
        </span>
      </div>
      
      {/* Detail Text */}
      <p className="mt-4 text-[7px] tracking-[0.6em] text-white/10 uppercase italic">
        Technical Specification // Verified
      </p>
    </motion.div>
  );
};

export default VitesseSection;