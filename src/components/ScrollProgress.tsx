import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Custom refined spring parameters for ultra-liquid luxurious deceleration curves
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] z-[100] pointer-events-none bg-black/10 dark:bg-white/5 backdrop-blur-[1px]">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary origin-left relative"
        style={{ scaleX }}
      >
        {/* Intricate laser-etched pulsing front leading-edge head glow */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/45 to-white" />
        
        {/* Neon light source aura emitting back onto the viewport */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[8px] bg-white rounded-full blur-[4px] opacity-95 shadow-[0_0_18px_var(--color-primary),0_0_8px_var(--color-secondary)]" />
        
        {/* Pulsating energy bead marker */}
        <motion.div 
          className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-primary shadow-[0_0_12px_#fff]"
          animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
