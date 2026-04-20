import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useThemeTransition } from '../hooks/useThemeTransition';

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleWithTransition } = useThemeTransition();
  const isDark = theme === 'dark';

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let x = 0;
    let y = 0;

    // Prefer exact touch/mouse interaction coordinates natively from the event.
    // This perfectly bypasses mobile Safari/Chrome visual viewport offsets.
    if ('clientX' in e && e.clientX > 0 && e.clientY > 0) {
      x = e.clientX;
      y = e.clientY;
    } else {
      // Fallback for keyboard Enter/Space, or if clientX somehow reports 0
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    toggleWithTransition({ clientX: x, clientY: y } as any);
  };

  return (
    <button
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
