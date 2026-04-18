import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useThemeTransition } from '../hooks/useThemeTransition';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleWithTransition } = useThemeTransition();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleWithTransition}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Pass center coordinates for keyboard access
          const rect = e.currentTarget.getBoundingClientRect();
          toggleWithTransition({ 
            clientX: rect.left + rect.width / 2, 
            clientY: rect.top + rect.height / 2 
          } as any);
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
