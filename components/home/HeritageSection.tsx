"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lenis } from "lenis/react";

const HeritageSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // PHYSICS: Heavier mass and higher damping for "Hydraulic" smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 35,
    mass: 2.5
  });

  const milestones = useMemo(() => [
    { year: "1909", title: "ETTORE BUGATTI", desc: "THE GENESIS OF AN ICON", sub: "MOLSHEIM, FRANCE" },
    { year: "1930", title: "TYPE 41 ROYALE", desc: "ENGINEERING SOVEREIGNTY", sub: "THE PEAK OF LUXURY" },
    { year: "2016", title: "CHIRON ERA", desc: "THE ULTIMATE FORM", sub: "300 MPH BARRIER" },
  ], []);

  // Horizontal Movement: Optimized for 3 panels
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <Lenis root options={{ lerp: 0.04, duration: 2.2, smoothWheel: true }}>
      <div ref={containerRef} className="relative h-[600vh] bg-[#020202] overflow-clip" id="heritage">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          {/* 1. OPTIMIZED ATMOSPHERE */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_80%)]" />
             {/* Simple Light Bleed instead of heavy SVG patterns */}
             <div className="absolute top-0 w-full h-1/3 bg-linear-to-b from-white/3 to-transparent" />
          </div>

          {/* 2. THE HORIZONTAL TRACK */}
          <motion.div 
            style={{ x: xTranslate, willChange: "transform" }}
            className="flex h-full w-[300%] items-center"
          >
            {milestones.map((m, i) => (
              <HeritagePanel key={i} milestone={m} index={i} progress={smoothProgress} />
            ))}
          </motion.div>

          {/* 3. REFINED PROGRESS BAR */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-12 z-20">
            <div className="h-px w-full bg-white/5 relative">
              <motion.div 
                style={{ scaleX: smoothProgress }}
                className="absolute inset-0 bg-white/20 origin-left"
              />
            </div>
            <div className="flex justify-between mt-3">
               <span className="text-[7px] tracking-[0.5em] text-white/10 uppercase">Genesis</span>
               <span className="text-[7px] tracking-[0.5em] text-white/10 uppercase">Peak</span>
            </div>
          </div>

        </div>
      </div>
    </Lenis>
  );
};

const HeritagePanel = ({ milestone, index, progress }: any) => {
  const start = index * 0.33;
  const end = (index + 1) * 0.33;
  
  // PARALLAX CALCULATIONS
  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const yearX = useTransform(progress, [start, end], ["10%", "-10%"]); // Subtle parallax
  const scale = useTransform(progress, [start, start + 0.15, end], [0.92, 1, 1.08]);

  return (
    <motion.div 
      style={{ opacity }}
      className="w-screen h-full flex flex-col items-center justify-center px-8 md:px-24 relative"
    >
      {/* BACKGROUND YEAR: Optimized Large Typography */}
      <motion.div 
        style={{ x: yearX, willChange: "transform" }}
        className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.03] pointer-events-none"
      >
        <span className="text-[30vw] font-black text-white select-none leading-none tracking-tighter">
          {milestone.year}
        </span>
      </motion.div>

      {/* CONTENT BLOCK */}
      <motion.div 
        style={{ scale }}
        className="relative z-10 w-full flex flex-col items-center text-center"
      >
        {/* Top Marker */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="w-px h-10 bg-linear-to-b from-transparent to-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>

        {/* Year & Title */}
        <span className="text-[10px] md:text-xs tracking-[1.2em] text-white/40 uppercase font-light mb-6">
          {milestone.year}
        </span>
        
        <h3 className="text-3xl md:text-7xl tracking-[0.6em] text-white font-extralight uppercase mb-8 ml-[0.6em]">
          {milestone.title}
        </h3>
        
        {/* Desc & Sub */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] md:text-sm tracking-[0.5em] font-extralight text-white/60 uppercase max-w-md">
            {milestone.desc}
          </p>
          <div className="h-px w-12 bg-white/10 my-2" />
          <p className="text-[8px] md:text-[10px] tracking-[0.8em] font-light text-white/20 uppercase italic">
            {milestone.sub}
          </p>
        </div>
      </motion.div>

      {/* FOOTER LABEL */}
      <div className="absolute bottom-12 right-12 hidden md:block opacity-10">
         <span className="text-[8px] tracking-[0.5em] text-white font-mono uppercase italic">Ref // ARCH-{milestone.year}</span>
      </div>
    </motion.div>
  );
};

export default HeritageSection;