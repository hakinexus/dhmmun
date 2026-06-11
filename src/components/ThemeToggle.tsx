import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useThemeTransition } from '../hooks/useThemeTransition';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { feedbackSounds } from '../lib/audio';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleWithTransition } = useThemeTransition();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Trigger physical haptic & click synth
    triggerHaptic(hapticPatterns.tap);
    feedbackSounds.click();

    let x = 0;
    let y = 0;

    // 1. Try to extract the literal touch/mouse interaction coordinates.
    if ('clientX' in e && typeof e.clientX === 'number' && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    }
    
    // 2. Fallback to extracting exactly from the DOM element's physical rect
    if ((x === 0 && y === 0) && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    }

    // ✨ CRITICAL SAFARI/CHROME MOBILE OFFSET FIX ✨
    if (window.visualViewport) {
      x += window.visualViewport.offsetLeft || 0;
      y += window.visualViewport.offsetTop || 0;
    }

    toggleWithTransition(x, y);
  };

  return (
    <motion.button
      ref={buttonRef}
      id="theme-toggle"
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle(e);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center w-[58px] h-[32px] rounded-full border shrink-0 cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none p-[3px] ${
        isDark 
          ? "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900" 
          : "bg-zinc-100/90 border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-200/50"
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Immersive background symbols - extremely muted for pristine minimalist feel */}
      <div className="absolute inset-0 flex justify-between items-center px-[9px] pointer-events-none z-0">
        <Sun 
          strokeWidth={2} 
          className={`w-[13px] h-[13px] transition-all duration-500 ${
            isDark 
              ? 'text-zinc-700/40 opacity-50' 
              : 'text-zinc-400 opacity-20'
          }`} 
        />
        <Moon 
          strokeWidth={2}
          className={`w-[12px] h-[12px] transition-all duration-500 ${
            isDark 
              ? 'text-zinc-600 opacity-20' 
              : 'text-zinc-500/50 opacity-50'
          }`} 
        />
      </div>

      {/* Elastic, Glowing Minimalist Sliding Thumb */}
      <motion.div
        className={`w-[24px] h-[24px] rounded-full z-10 flex items-center justify-center border transition-all duration-300 pointer-events-none overflow-hidden ${
          isDark 
            ? "border-zinc-700/60 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
            : "border-zinc-200/50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
        }`}
        initial={false}
        animate={{ 
          x: isDark ? 26 : 0 
        }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon-icon"
              initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 60, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center text-[#00daf3]"
            >
              <Moon strokeWidth={2.5} className="w-3.5 h-3.5 filter drop-shadow-[0_0_3px_rgba(0,218,243,0.4)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ rotate: 60, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -60, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center text-[#a88544]"
            >
              <Sun strokeWidth={2.5} className="w-[14px] h-[14px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
