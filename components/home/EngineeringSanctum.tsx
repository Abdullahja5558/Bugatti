"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lenis } from "lenis/react";

const EngineeringSanctum = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // PHYSICS: Faster response (stiffness up), high damping for smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25, // Fast start
    damping: 40,   // Silky finish
    mass: 1.5
  });

  // CAR KINETICS: Instant Reveal & Aggressive Exit
  // Starts appearing at 2% scroll for immediate impact
  const carOpacity = useTransform(smoothProgress, [0, 0.05, 0.2, 0.55, 0.65], [0, 1, 1, 1, 0]);
  const carScale = useTransform(smoothProgress, [0, 0.2, 0.55, 0.65], [0.8, 0.9, 0.92, 1.1]);
  const carBlur = useTransform(smoothProgress, [0, 0.1, 0.55, 0.65], ["20px", "0px", "0px", "30px"]);

  // HUD TIMING: Fast, overlapping transitions
  const leftOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
  const rightOpacity = useTransform(smoothProgress, [0.4, 0.55, 0.65], [0, 1, 0]);

  return (
    <Lenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {/* THE OBSIDIAN VOID */}
      <div ref={containerRef} className="relative h-[700vh] bg-[#000000] overflow-clip" id="engineering">
        
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          
          {/* 1. LIGHTING: Volumetric Studio Glow */}
          <div className="absolute inset-0 z-0">
             {/* Top Spotlight */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-linear-to-b from-white/6 to-transparent blur-[100px]" />
             {/* Center Glow */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
          </div>

          {/* 2. THE MACHINE: Hyper-Sharp Centerpiece */}
          <motion.div 
            style={{ 
              opacity: carOpacity, 
              scale: carScale,
              filter: `blur(${carBlur})`
            }}
            className="relative z-20 w-full max-w-200 px-12 pointer-events-none"
          >
            <img 
              src="/enginee.png" 
              alt="Engineering" 
              className="w-full h-auto object-contain brightness-[1.1] contrast-[1.2]"
            />
            
            {/* AMBIENT SHADOW: Floating effect */}
            <motion.div 
              style={{ opacity: carOpacity }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-2 bg-white/10 blur-[80px] rounded-full" 
            />
          </motion.div>

          {/* 3. LEFT HUD (Propulsion) */}
          <motion.div 
            style={{ opacity: leftOpacity, x: useTransform(smoothProgress, [0.15, 0.3], [-40, 0]) }}
            className="absolute left-8 md:left-24 z-30"
          >
            <div className="space-y-32">
              <TitaniumSpec index="I" label="Core" value="W16 8.0L" />
              <TitaniumSpec index="II" label="Force" value="1500 PS" />
            </div>
          </motion.div>

          {/* 4. RIGHT HUD (Craft) */}
          <motion.div 
            style={{ opacity: rightOpacity, x: useTransform(smoothProgress, [0.4, 0.55], [40, 0]) }}
            className="absolute right-8 md:right-24 z-30 text-right"
          >
            <div className="space-y-32">
              <TitaniumSpec index="III" label="Chassis" value="CARBON" align="right" />
              <TitaniumSpec index="IV" label="Origin" value="MOLSHEIM" align="right" />
            </div>
          </motion.div>

          {/* 5. MINIMAL PROGRESS AXIS */}
          <motion.div 
            style={{ opacity: useTransform(carOpacity, [0, 1], [0, 0.3]) }}
            className="absolute bottom-16 w-px h-20 bg-linear-to-b from-white/40 to-transparent" 
          />

        </div>
      </div>
    </Lenis>
  );
};

const TitaniumSpec = ({ index, label, value, align = "left" }: any) => {
  const isRight = align === "right";
  
  return (
    <div className={`flex flex-col ${isRight ? "items-end" : "items-start"}`}>
      {/* Index & Label */}
      <div className={`flex items-center gap-4 mb-3 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        <span className="text-[8px] font-mono text-white/20">{index}</span>
        <div className="w-8 h-[0.5px] bg-white/20" />
        <span className="text-[9px] tracking-[0.5em] text-white/40 uppercase font-light">{label}</span>
      </div>

      {/* Value with Titanium Shimmer */}
      <div className="relative overflow-hidden group">
        <h3 className="text-2xl md:text-5xl tracking-tighter text-white font-thin uppercase leading-none">
          {value}
        </h3>
        {/* Shimmer Light Stroke */}
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />
      </div>

      {/* Accent Hairline */}
      <div className={`mt-6 h-[0.5px] w-16 bg-linear-to-r ${isRight ? "from-transparent to-white/10" : "from-white/10 to-transparent"}`} />
    </div>
  );
};

export default EngineeringSanctum;