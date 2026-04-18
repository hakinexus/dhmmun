import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Home, Info, Users } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-16 h-8 rounded-full bg-surface-container-highest border border-outline-variant/20 overflow-hidden transition-colors duration-300 shrink-0 ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute left-1 top-1 bottom-1 w-6 rounded-full bg-primary shadow-md"
        animate={{ x: theme === 'dark' ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex justify-between items-center px-[8px] pointer-events-none">
        <Sun className={`w-4 h-4 z-10 transition-colors duration-300 ${theme === 'light' ? 'text-on-primary' : 'text-on-surface-variant'}`} />
        <Moon className={`w-4 h-4 z-10 transition-colors duration-300 ${theme === 'dark' ? 'text-on-primary' : 'text-on-surface-variant'}`} />
      </div>
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const accumulatedScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If we're on desktop (md breakpoint is 768px), the header should never hide.
    if (window.innerWidth >= 768) {
      if (isHidden) setIsHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Always show at the very top
    if (latest <= 150) {
      setIsHidden(false);
      accumulatedScroll.current = 0;
      return;
    }

    if (isOpen) return;

    // Reset accumulator if direction changes
    if ((diff > 0 && accumulatedScroll.current < 0) || (diff < 0 && accumulatedScroll.current > 0)) {
      accumulatedScroll.current = 0;
    }

    accumulatedScroll.current += diff;

    // Require 60px of downward scroll to hide, 30px of upward scroll to show
    if (accumulatedScroll.current > 60) {
      setIsHidden(true);
    } else if (accumulatedScroll.current < -30) {
      setIsHidden(false);
    }
  });

  // Handle resize events to guarantee desktop header is always visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isHidden) {
        setIsHidden(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHidden]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const mobileBaseLinkClass = "block w-full text-center py-4 font-medium transition-all duration-300 font-body text-lg rounded-xl";
  const mobileInactiveLinkClass = "text-on-surface-variant hover:bg-primary/5 hover:text-primary";
  const mobileActiveLinkClass = "text-primary font-bold bg-primary/10 liquid-border";

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Committees', path: '/committees', icon: Users },
  ];

  return (
    <>
      {/* Background Blur Overlay for Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface/60 backdrop-blur-md md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header 
        layout
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isHidden ? -100 : 0, 
          opacity: isHidden ? 0 : 1 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          opacity: { duration: 0.3 },
          layout: { type: "spring", bounce: 0, duration: 0.4 }
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col px-6 md:px-10 py-4 mt-4 md:mt-6 mx-auto w-[95%] md:w-[90%] max-w-6xl backdrop-blur-2xl overflow-hidden ${isOpen ? 'rounded-[2rem]' : 'rounded-full'}`}
        style={{ 
          backgroundColor: 'var(--nav-bg)',
          boxShadow: 'var(--nav-shadow)',
          border: '1px solid var(--nav-border)'
        }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="text-2xl font-black tracking-tighter text-primary font-headline w-1/3 md:w-auto">
            DHMMUN
          </div>
          
          {/* Mobile Theme Toggle (Middle) */}
          <div className="md:hidden flex justify-center w-1/3">
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-2 relative"
            onMouseLeave={() => setHoveredPath(null)}
          >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isHovered = hoveredPath === link.path;
            const showIndicator = hoveredPath ? isHovered : isActive;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={`relative px-5 py-2 rounded-full font-medium transition-colors duration-300 font-body text-base tracking-wide ${
                  isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {showIndicator && (
                  <motion.div
                    layoutId="desktop-nav-indicator"
                    className="absolute inset-0 bg-secondary/20 border border-secondary/30 rounded-full -z-10 icon-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="flex items-center justify-end gap-4 w-1/3 md:w-auto">
          {/* Desktop Theme Toggle */}
          <ThemeToggle className="hidden md:flex" />

          <button 
            onClick={() => navigate('/registration')}
            className="hidden md:block bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-8 py-2.5 rounded-full scale-105 active:scale-95 transition-transform font-headline"
          >
            Join Now
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            ref={buttonRef}
            className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors active:scale-95 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        </div>

        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col gap-2 w-full overflow-hidden"
            >
              <div className="pt-6 pb-2 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 active:scale-95 ${
                        isActive 
                          ? 'bg-primary/10 text-on-surface opacity-100' 
                          : 'text-on-surface-variant opacity-60 hover:opacity-100 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                        <span className={`font-headline font-semibold text-lg ${isActive ? 'text-primary' : ''}`}>{link.name}</span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </NavLink>
                  );
                })}
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/registration');
                  }}
                  className="mt-2 w-full bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-4 py-3.5 rounded-xl active:scale-95 transition-transform font-headline text-lg"
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
