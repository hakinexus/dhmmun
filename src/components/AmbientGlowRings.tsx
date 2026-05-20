import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function AmbientGlowRings() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, liquid inertia responses
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Relative coordinates to page center
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Glow Ring 1: Magnetized Cursor Follower (with high-end cyber cyan/teal gradient & radial blur) */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[450px] h-[450px] md:w-[650px] md:h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] dark:opacity-[0.22] blur-[120px] mix-blend-screen pointer-events-none hidden md:block"
        style={{
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, var(--color-primary) 0%, var(--color-secondary) 50%, transparent 100%)',
        }}
      />

      {/* Glow Ring 2: Asynchronous floating node (providing multi-dimensional organic movement even on mobile) */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.12] dark:opacity-[0.18] blur-[100px] mix-blend-screen"
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -110, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, var(--color-secondary) 0%, var(--color-on-primary-container) 60%, transparent 100%)',
        }}
      />

      {/* Glow Ring 3: Deep low-frequency background shadow pulse */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full opacity-[0.08] dark:opacity-[0.15] blur-[110px] mix-blend-screen"
        animate={{
          x: [0, -70, 90, 0],
          y: [0, 80, -90, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 100%)',
        }}
      />

      {/* Exquisite SVG-guided organic backdrop-pattern mask to texturize the shadows */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <filter id="vector-organic-fluid">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vector-organic-fluid)" />
      </svg>
    </div>
  );
}
