import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useThemeTransition } from '../hooks/useThemeTransition';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleWithTransition } = useThemeTransition();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let x = 0;
    let y = 0;

    // 1. Try to extract the literal touch/mouse interaction coordinates.
    // This is the absolute source of truth for where the user's finger actually rested.
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
    // When the mobile URL bar is visible, the Visual Viewport is offset from the Layout Viewport.
    // Since View Transitions natively map to the layout snapshot, we must mathematically
    // translate the interaction coordinates to account for the browser UI pushing the layout.
    if (window.visualViewport) {
      x += window.visualViewport.offsetLeft || 0;
      y += window.visualViewport.offsetTop || 0;
    }

    toggleWithTransition(x, y);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle(e);
        }
      }}
      className={`relative flex items-center w-16 h-8 rounded-full bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0 cursor-pointer ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Icon Track */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Sun 
          strokeWidth={2.5} 
          className={`w-4 h-4 z-10 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${!isDark ? 'text-on-primary scale-100 opacity-100' : 'text-on-surface-variant scale-[0.6] opacity-40'}`} 
        />
        <Moon 
          strokeWidth={2.5}
          className={`w-4 h-4 z-10 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isDark ? 'text-on-primary scale-100 opacity-100' : 'text-on-surface-variant scale-[0.6] opacity-40'}`} 
        />
      </div>
      
      {/* Sliding Thumb */}
      <motion.div
        className="absolute left-1 top-1 bottom-1 w-6 rounded-full bg-primary shadow-lg"
        initial={false}
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />
    </button>
  );
}
