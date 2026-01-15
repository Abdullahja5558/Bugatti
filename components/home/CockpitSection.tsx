"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lenis } from "lenis/react";

const CockpitSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // PHYSICS: Precision-tuned for no-lag high refresh rate monitors
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20, // Slightly lower for more "weight"
    damping: 40,
    mass: 1.5
  });

  // TRANSFORMATIONS: Optimized ranges to prevent element overlap
  const titleOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [0, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.12], [1.05, 0.95]);
  
  const interiorScale = useTransform(smoothProgress, [0.1, 0.9], [1.08, 1]);
  const interiorOpacity = useTransform(smoothProgress, [0.05, 0.12, 0.88, 0.95], [0, 1, 1, 0]);
  const cockpitBlur = useTransform(smoothProgress, [0, 0.08, 0.92, 1], ["15px", "0px", "0px", "15px"]);

  // Memoized Spec Data for performance optimization
  const specs = useMemo(() => [
    { id: "01", label: "Command Unit", value: "ALUMINUM", range: [0.18, 0.38], pos: { top: "52%", left: "15%" } },
    { id: "02", label: "Visual Core", value: "CHRONOGRAPH", range: [0.42, 0.62], pos: { top: "30%", left: "55%" } },
    { id: "03", label: "Chassis Link", value: "CARBON FIBRE", range: [0.68, 0.88], pos: { top: "75%", left: "25%" } },
  ], []);

  return (
    <Lenis root options={{ lerp: 0.06, duration: 1.5, smoothWheel: true }}>
      <div ref={containerRef} className="relative h-[800vh] bg-black overflow-clip" id="cockpit">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* 1. LAYER: OPTIMIZED ATMOSPHERE */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.04)_0%,transparent_75%)]" />
            {/* Minimal Noise for texture without lag */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          {/* 2. LAYER: HERO TITLE (Fades out quickly to focus on image) */}
          <motion.div 
            style={{ opacity: titleOpacity, scale: titleScale, translateZ: 0 }}
            className="absolute z-50 text-center will-change-transform"
          >
            <span className="text-[8px] tracking-[1.5em] text-white/30 uppercase mb-4 block ml-[1.5em]">Engineering Beauty</span>
            <h2 className="text-[12vw] md:text-[9vw] font-thin text-white uppercase tracking-[-0.06em] leading-none">
              VITESSE <span className="font-serif italic text-[10vw] md:text-[7vw] tracking-tighter">Cockpit</span>
            </h2>
          </motion.div>

          {/* 3. LAYER: THE CORE ASSET (Interior) */}
          <motion.div 
            style={{ 
              opacity: interiorOpacity, 
              scale: interiorScale,
              filter: `blur(${cockpitBlur})`,
              translateZ: 0 
            }}
            className="relative z-10 w-full max-w-350 px-4 md:px-12 will-change-[transform,opacity,filter]"
          >
            {/* Shadow Depth */}
            <div className="absolute inset-0 z-20 bg-linear-to-b from-black via-transparent to-black opacity-50" />
            
            <img 
              src="/interior2.jpg" 
              alt="Bugatti Interior" 
              className="w-full h-auto object-contain brightness-[0.95] contrast-[1.1] shadow-2xl"
              loading="eager"
            />
            
            {/* OPTICAL LIGHT SHIMMER (Hardware Accelerated) */}
            <motion.div 
              style={{ x: useTransform(smoothProgress, [0, 1], ["-130%", "130%"]), translateZ: 0 }}
              className="absolute inset-0 z-30 pointer-events-none bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-35deg] blur-[100px]"
            />
          </motion.div>

          {/* 4. LAYER: RESPONSIVE HUD SPECS */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <div className="relative w-full h-full max-w-300 mx-auto px-6">
              {specs.map((spec) => (
                <PremiumSpec key={spec.id} {...spec} progress={smoothProgress} />
              ))}
            </div>
          </div>

          {/* 5. FOOTER: SYSTEM STATUS */}
          <div className="absolute bottom-10 left-10 md:left-20 flex items-center gap-4 opacity-20">
             <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
             <span className="text-[7px] tracking-[1em] text-white uppercase font-mono leading-none">System.Active // LVL-09</span>
          </div>

        </div>
      </div>
    </Lenis>
  );
};

const PremiumSpec = ({ id, label, value, range, progress, pos }: any) => {
  const opacity = useTransform(progress, [range[0], range[0] + 0.04, range[1] - 0.04, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [30, -30]);
  const scale = useTransform(progress, [range[0], range[0] + 0.08], [0.97, 1]);

  return (
    <motion.div 
      style={{ 
        opacity, 
        y, 
        scale, 
        top: pos.top, 
        left: pos.left, 
        translateZ: 0 
      }}
      className="absolute flex items-start gap-5 w-60 md:w-95 will-change-[transform,opacity]"
    >
      {/* Structural Marker */}
      <div className="flex flex-col items-center pt-2">
        <span className="text-[10px] font-mono text-white/40 mb-3 leading-none tracking-tighter">{id}</span>
        <div className="w-[0.5px] h-14 bg-linear-to-b from-white/30 to-transparent" />
      </div>

      <div className="flex flex-col">
        <span className="text-[8px] tracking-[0.6em] text-white/20 uppercase mb-2 font-semibold">
          {label}
        </span>
        <h3 className="text-xl md:text-5xl font-thin text-white uppercase tracking-tight leading-none">
          {value}
        </h3>
        
        {/* Responsive Detail Bar */}
        <div className="relative w-full h-[0.5px] bg-white/5 mt-5 overflow-hidden">
          <motion.div 
            style={{ scaleX: useTransform(progress, [range[0], range[1]], [0, 1]), translateZ: 0 }}
            className="absolute inset-0 bg-white/40 origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CockpitSection;