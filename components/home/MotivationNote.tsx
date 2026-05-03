"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const MotivationNote = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 10,
    damping: 35,
    mass: 2,
  });
  const lines = [
    "Greatness is silent.",
    "It is built in shadows,",
    "polished with absolute patience,",
    "and forged in the fire of discipline.",
    "It does not scream for attention,",
    "for it knows its own worth.",
    "A masterpiece is never rushed,",
    "it is revealed only to those",
    "who possess the soul to wait."
  ];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black overflow-clip">
    
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          {/* Dynamic Light Pillar */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.15, 0.05]),
              scaleX: useTransform(smoothProgress, [0, 1], [1, 1.5]) 
            }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] blur-[100px]" 
          />
          
          {/* Static Film Grain */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        </div>

        {/* THE MANUSCRIPT: High-Contrast Vertical Narrative */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-300">
          {lines.map((line, index) => (
            <TextLine 
              key={index} 
              text={line} 
              index={index} 
              total={lines.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>

        {/* PREMIUM ACCENT: The Horizon Line */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.05, 0.5, 0.95], [0, 0.1, 0]),
            width: useTransform(smoothProgress, [0, 1], ["0%", "40%"])
          }}
          className="absolute bottom-20 h-[0.5px] bg-linear-to-r from-transparent via-white to-transparent" 
        />

        {/* STATUS WHISPER */}
        <div className="absolute bottom-10 w-full flex justify-center opacity-10">
           <span className="text-[6px] tracking-[2em] text-white uppercase ml-[2em]">Molsheim // Archive</span>
        </div>
      </div>
    </div>
  );
};

const TextLine = ({ text, index, total, progress }: any) => {
  const start = index / total;
  const end = (index + 1) / total;

  // Cinematic Motion Logic
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [60, -60]); // Slow vertical glide
  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.92, 1, 1, 0.92]);
  const blur = useTransform(progress, [start, start + 0.08, end - 0.08, end], ["15px", "0px", "0px", "15px"]);
  const tracking = useTransform(progress, [start, end], ["0.8em", "1.4em"]);

  return (
    <motion.div
      style={{ 
        opacity, 
        y,
        scale,
        letterSpacing: tracking, 
        filter: `blur(${blur})`,
        translateZ: 0,
        willChange: "transform, opacity, filter"
      }}
      className="absolute h-fit py-4 flex items-center justify-center pointer-events-none"
    >
      <span className="text-[11px] sm:text-[14px] md:text-[18px] font-extralight uppercase text-white leading-none whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
        {text}
      </span>
    </motion.div>
  );
};

export default MotivationNote;