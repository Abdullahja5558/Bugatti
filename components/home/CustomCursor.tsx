"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Precision Physics: Fast response with zero jitter
  const springConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractable = target.closest("button, a, .premium-hover, input");
      setIsHovered(!!isInteractable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", () => setIsActive(true));
    window.addEventListener("mouseup", () => setIsActive(false));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. CORE: The Needle Point */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        className="absolute flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: isActive ? 0.8 : 1 }}
          className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
        />
      </motion.div>

      {/* 2. THE FOCUS RING: Tight & Premium */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        className="absolute"
      >
        <motion.div
          animate={{
            width: isHovered ? 50 : 24,
            height: isHovered ? 50 : 24,
            opacity: isHovered ? 1 : 0.4,
            borderColor: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
            backgroundColor: isHovered ? "rgba(255,255,255,0.05)" : "transparent",
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="border-[0.5px] rounded-full backdrop-blur-[1px] flex items-center justify-center"
        >
          {/* Micro-Crosshair appear on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[0.5px] bg-white/20 w-[15%] left-0" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[0.5px] bg-white/20 w-[15%] right-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 3. THE LIGHT BLEED: Obsidian Aura */}
      <motion.div
        style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
        className="absolute"
      >
        <motion.div
          animate={{
            scale: isHovered ? 3 : 1.5,
            opacity: isHovered ? 0.3 : 0.1,
          }}
          className="w-20 h-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)] blur-2xl"
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;