import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Home, Info, Users } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { feedbackSounds } from '../lib/audio';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    
    // Dynamic glass calculation: measure kinetic velocity
    const velocity = Math.abs(diff);
    setScrollVelocity(velocity);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollVelocity(0);
    }, 150);
  });

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

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Committees', path: '/committees', icon: Users },
  ];

  // Dynamically blend glass based on scroll speed
  const isScrollingFast = scrollVelocity > 10;
  const glassBlurClass = isScrollingFast ? 'backdrop-blur-[45px] transition-all duration-300' : 'backdrop-blur-2xl transition-all duration-300';
  const borderOpacityClass = isScrollingFast 
    ? 'border-primary/25 dark:border-primary/20' 
    : 'border-primary/10 dark:border-white/5';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuContainerVariants = {
    closed: {
      opacity: 0,
      y: -10,
      pointerEvents: 'none' as const,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 30,
        staggerChildren: 0.03,
        staggerDirection: -1 as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto' as const,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 28,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      y: -8,
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 30
      }
    },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 350, 
        damping: 26 
      } 
    }
  };

  return (
    <>
      {/* Background Blur Overlay for Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-surface/40 backdrop-blur-md md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header 
        ref={menuRef}
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          height: isMobile && isOpen ? "390px" : "72px",
          borderRadius: isMobile && isOpen ? "2.25rem" : "9999px"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 280, 
          damping: 26,
          mass: 0.55
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col px-6 md:px-10 mt-4 md:mt-6 mx-auto w-[95%] md:w-[90%] max-w-6xl overflow-hidden ${glassBlurClass}`}
        style={{ 
          backgroundColor: isScrollingFast ? 'rgba(var(--color-background-rgb), 0.75)' : 'var(--nav-bg)',
          boxShadow: 'var(--nav-shadow)',
          border: `1px solid var(--nav-border)`,
          borderColor: isScrollingFast ? 'var(--color-primary)' : 'inherit',
        }}
      >
        {/* Fixed Header Row - Stays centered always, no jumping */}
        <div className="flex justify-between items-center w-full h-[72px] shrink-0">
          <motion.div 
            onClick={() => {
              triggerHaptic(hapticPatterns.tap);
              feedbackSounds.click();
              navigate('/');
            }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-black tracking-tighter text-primary font-headline w-1/3 md:w-auto cursor-pointer hover:opacity-80 transition-all select-none"
          >
            DHMMUN
          </motion.div>
          
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

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onClick={() => {
                    triggerHaptic(hapticPatterns.light);
                    feedbackSounds.click();
                  }}
                  className={`relative px-5 py-2 rounded-full font-medium transition-colors duration-300 font-body text-base tracking-wide ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {/* Dynamic Active Morphing background pill */}
                  {isActive && !hoveredPath && (
                    <motion.div
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10 shadow-[inner_0_1px_0_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    />
                  )}
                  {/* Hover Morphing state */}
                  {isHovered && (
                    <motion.div
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 bg-secondary/15 border border-secondary/25 rounded-full -z-10 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.06)]"
                      transition={{ type: "spring", stiffness: 150, damping: 20 }}
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

            <motion.button 
              onClick={() => {
                triggerHaptic(hapticPatterns.success);
                feedbackSounds.success();
                navigate('/registration');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-8 py-2.5 rounded-full font-headline cursor-pointer"
            >
              Join Now
            </motion.button>

            {/* Mobile Menu Toggle - Rotate morph animation */}
            <motion.button 
              ref={buttonRef}
              className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors relative w-10 h-10 flex items-center justify-center cursor-pointer"
              onClick={() => {
                triggerHaptic(hapticPatterns.tap);
                feedbackSounds.click();
                setIsOpen(!isOpen);
              }}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -180, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    className="absolute"
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 180, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -180, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    className="absolute"
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuContainerVariants}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.05, bottom: 0.45 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 60) {
              setIsOpen(false);
              triggerHaptic(hapticPatterns.tap);
              feedbackSounds.click();
            }
          }}
          className="md:hidden flex flex-col gap-2 w-full overflow-hidden absolute top-[72px] left-0 right-0 px-6 pb-6 select-none cursor-grab active:cursor-grabbing"
        >
          <div className="pt-2 pb-2 flex flex-col gap-2">
            <div className="text-[10px] font-mono tracking-widest text-on-surface-variant opacity-40 text-center uppercase mb-3">
              Swipe Down to Collapse
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.name}
                  variants={menuItemVariants}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      triggerHaptic(hapticPatterns.light);
                      feedbackSounds.click();
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/10 text-on-surface opacity-100 font-bold' 
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
                </motion.div>
              );
            })}
            <motion.button 
              variants={menuItemVariants}
              onClick={() => {
                setIsOpen(false);
                triggerHaptic(hapticPatterns.success);
                feedbackSounds.success();
                navigate('/registration');
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 w-full bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-4 py-3.5 rounded-xl transition-transform font-headline text-lg cursor-pointer"
            >
              Join Now
            </motion.button>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
