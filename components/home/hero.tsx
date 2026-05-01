"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lenis } from "lenis/react";
import { section } from "framer-motion/client";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const carY = useTransform(scrollYProgress, [0, 1], ["22%", "5%"]); 
  const carScale = useTransform(scrollYProgress, [0, 1], [0.82, 1.12]);
  const carOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const specOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.8, 0.9], [0, 1, 1, 0]);
  const specSlide = useTransform(scrollYProgress, [0.45, 0.55], [40, 0]);

  return (
    
    <Lenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <div ref={containerRef} className="relative h-[800vh] bg-[#020202]" id="chiron">
        
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_0%,transparent_75%)]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.h1 
              style={{ 
                opacity: useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]),
                scale: useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1.1]),
              }}
              className="text-6xl md:text-[11vw] tracking-[0.7em] uppercase font-thin text-white/80 ml-[0.7em]"
            >
              CHIRON
            </motion.h1>
          </div>

          <motion.div 
            style={{ y: carY, scale: carScale, opacity: carOpacity }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <img 
              src="/bugatti.png" 
              alt="Bugatti Chiron" 
              className="w-full max-w-360 h-auto object-contain brightness-110 saturate-[0.85] px-8"
            />
          </motion.div>

          <div className="absolute inset-0 z-30 pointer-events-none px-10 md:px-24 pt-32 pb-24 flex flex-col justify-between">
            
            <div className="flex justify-between items-start">
              <SpecHUD 
                category="Power-Unit" 
                value="W16 QUAD-TURBO" 
                detail="8.0L CONFIGURATION"
                opacity={specOpacity} 
                y={specSlide}
                align="left"
              />
              <SpecHUD 
                category="Structure" 
                value="CARBON FIBER" 
                detail="AERONAUTICAL GRADE"
                opacity={specOpacity} 
                y={specSlide}
                align="right"
              />
            </div>

            <div className="flex justify-between items-end">
              <SpecHUD 
                category="Dynamics" 
                value="1500 HORSEPOWER" 
                detail="PEAK OUTPUT"
                opacity={specOpacity} 
                y={-specSlide}
                align="left"
              />
              <SpecHUD 
                category="Heritage" 
                value="HAND CRAFTED" 
                detail="MOLSHEIM ATELIER"
                opacity={specOpacity} 
                y={-specSlide}
                align="right"
              />
            </div>
          </div>

          {/* 5. CINEMATIC SWEEP */}
          <motion.div 
            style={{ x: useTransform(scrollYProgress, [0, 1], ["-160%", "160%"]) }}
            className="absolute inset-0 z-40 pointer-events-none opacity-40"
          >
            <div className="w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-45 blur-[160px]" />
          </motion.div>

        </div>
      </div>
    </Lenis>
  );
};

const SpecHUD = ({ category, value, detail, opacity, y, align }: any) => {
  const isRight = align === "right";

  return (
    <motion.div 
      style={{ opacity, y }}
      className={`flex flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}
    >
      {/* Category Label */}
      <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-light mb-1">
        {category}
      </span>
      
      {/* Precision Hairline */}
      <motion.div 
        style={{ scaleX: opacity }}
        className={`h-px w-16 bg-white/20 origin-${isRight ? "right" : "left"}`}
      />

      {/* Primary Value */}
      <div className="mt-3 overflow-hidden">
        <span className="block text-lg md:text-3xl tracking-[0.15em] text-white font-extralight uppercase">
          {value}
        </span>
      </div>

      {/* Technical Detail */}
      <span className="mt-1 text-[8px] tracking-[0.2em] text-white/20 uppercase font-medium">
        {detail}
      </span>
    </motion.div>
  );
  
};

export default Hero;