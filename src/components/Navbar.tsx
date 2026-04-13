import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-7 rounded-full bg-surface-container-highest border border-outline-variant/20 overflow-hidden transition-colors duration-300 shrink-0 ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute left-1 top-1 bottom-1 w-5 rounded-full bg-primary shadow-md"
        animate={{ x: theme === 'dark' ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex justify-between items-center px-[6px] pointer-events-none">
        <Sun className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ${theme === 'light' ? 'text-on-primary' : 'text-on-surface-variant'}`} />
        <Moon className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ${theme === 'dark' ? 'text-on-primary' : 'text-on-surface-variant'}`} />
      </div>
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Committees', path: '/committees' },
  ];

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-6xl backdrop-blur-2xl transition-all duration-500"
        style={{ 
          backgroundColor: 'var(--nav-bg)',
          boxShadow: 'var(--nav-shadow)',
          border: '1px solid var(--nav-border)'
        }}
      >
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
            className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[104px] left-0 right-0 z-40 mx-auto w-[90%] max-w-md liquid-glass rounded-3xl flex flex-col md:hidden overflow-hidden origin-top"
            style={{ boxShadow: 'var(--dropdown-shadow)' }}
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `${mobileBaseLinkClass} ${isActive ? mobileActiveLinkClass : mobileInactiveLinkClass}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="w-full h-[1px] bg-on-surface/10 my-4"></div>
              <button 
                onClick={() => navigate('/registration')}
                className="w-full bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-8 py-4 rounded-2xl active:scale-95 transition-transform font-headline text-lg icon-glow"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
