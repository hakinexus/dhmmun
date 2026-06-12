import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic, hapticPatterns } from '../lib/haptics';
import { feedbackSounds } from '../lib/audio';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Shield, Zap, Sparkles, Navigation, RotateCcw } from 'lucide-react';

export default function KeyboardShortcutsHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastShortcut, setLastShortcut] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Pulse action toast helper
  const triggerShortcutFeedback = (shortcutLabel: string) => {
    setLastShortcut(shortcutLabel);
    triggerHaptic(hapticPatterns.light);
    feedbackSounds.click();
  };

  // Automatically fade out the shortcut trigger notification
  useEffect(() => {
    if (lastShortcut) {
      const timer = setTimeout(() => {
        setLastShortcut(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastShortcut]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Determine if we are focusing an input or editable field so we can shield common key events
      const isTyping = 
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      // --- 2. GLOBAL SHORTCUTS (Alt + Key) ---
      // Alt-based shortcuts won't typically conflict with text inputs, so we can run them even when typing!
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const key = e.key.toLowerCase();
        
        switch (key) {
          case 'h': // Navigate Home
            e.preventDefault();
            navigate('/');
            triggerShortcutFeedback('Alt + H: Home Page');
            break;
          case 'a': // Navigate About
            e.preventDefault();
            navigate('/about');
            triggerShortcutFeedback('Alt + A: About Page');
            break;
          case 'c': // Navigate Committees
            e.preventDefault();
            navigate('/committees');
            triggerShortcutFeedback('Alt + C: Committees');
            break;
          case 'r': // Navigate Registration
            e.preventDefault();
            navigate('/registration');
            triggerShortcutFeedback('Alt + R: Registration');
            break;
          case 't': // Toggle Dark/Light Theme
            e.preventDefault();
            toggleTheme();
            triggerShortcutFeedback(`Alt + T: Theme Toggle (${theme === 'light' ? 'Dark' : 'Light'})`);
            break;
          case 's': // Toggle Shortcuts panel
            e.preventDefault();
            setIsOpen(prev => !prev);
            triggerShortcutFeedback('Alt + S: Opened Commands Menu');
            break;
          default:
            break;
        }
      }

      // --- 3. EXPLICIT REGISTRATION CONTEXT SHORTCUTS (On Registration route) ---
      if (location.pathname === '/registration') {
        // Enter Advance/Submit (Ctrl + Enter / Cmd + Enter), even when typing
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-next-step'));
          triggerShortcutFeedback('Ctrl+Enter: Advance Page');
        }

        // Fill Demo / Sample simulation dataset (Alt + D or Ctrl + Alt + D)
        if ((e.altKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-autofill-demo'));
          triggerShortcutFeedback('Alt + D: Simulated Geopolitical Credential Loader');
        }

        // Jump Steps directly via keyboard keys (Ctrl + Alt + [1-4])
        if (e.altKey && (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4')) {
          e.preventDefault();
          const targetStep = parseInt(e.key, 10);
          window.dispatchEvent(new CustomEvent('dhmmun-go-step', { detail: { step: targetStep } }));
          triggerShortcutFeedback(`Alt + ${e.key}: Force-Jump to Dossier Step ${e.key}`);
        }

        // Clear Draft (Ctrl + Alt + X)
        if (e.altKey && e.key.toLowerCase() === 'x') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-clear-draft'));
          triggerShortcutFeedback('Alt + X: Purge Draft Cache');
        }

        // Previous Step (Alt + P or Alt + B or Backspace/LeftArrow when not typing)
        if (e.altKey && (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'b')) {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-prev-step'));
          triggerShortcutFeedback('Alt + P: Previous Page');
        }

        // Left Arrow navigation when NOT typing
        if (!isTyping && e.key === 'ArrowLeft') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-prev-step'));
          triggerShortcutFeedback('← Arrow: Previous Page');
        }

        // Right Arrow navigation when NOT typing
        if (!isTyping && e.key === 'ArrowRight') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('dhmmun-next-step'));
          triggerShortcutFeedback('→ Arrow: Next Page');
        }
      }

      // --- 4. TOGGLE HELP VIA '?' KEY (Shift + / when not typing) ---
      if (!isTyping && e.key === '?') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        triggerShortcutFeedback('?: Command Help Menu');
      }

      // --- 5. Escape out of modal ---
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerHaptic(hapticPatterns.light);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname, toggleTheme, theme, isOpen]);

  return (
    <>
      {/* Floating Active Shortcut Indicator (Pure God-Level Polish) */}
      <AnimatePresence>
        {lastShortcut && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-10 left-6 md:left-10 z-[101] bg-primary text-on-primary border border-primary/20 backdrop-blur-xl px-4 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(var(--color-primary),0.3)] flex items-center gap-2"
          >
            <Zap className="w-4 h-4 animate-bounce text-on-primary" />
            <span className="text-xs font-mono font-medium tracking-wide">{lastShortcut}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive HUD Keyboard Shortcut Cheat Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                triggerHaptic(hapticPatterns.light);
                setIsOpen(false);
              }}
              className="absolute inset-0 bg-zinc-950/40 dark:bg-zinc-950/80 backdrop-blur-md"
            />

            {/* Panel Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="relative w-full max-w-2xl bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-3xl border border-zinc-200/80 dark:border-zinc-800/60 rounded-[2.2rem] shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-10 text-on-surface overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200/80 dark:border-zinc-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-headline font-black tracking-tight text-on-surface flex items-center gap-2">
                      Command Deck Shortcuts
                    </h3>
                    <p className="text-xs text-on-surface-variant font-body">Enhanced high-productivity keystrokes with active indicators.</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    triggerHaptic(hapticPatterns.light);
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-on-surface transition-colors cursor-pointer"
                  id="close_shortcuts_modal_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts content grid */}
              <div className="mt-6 space-y-8 text-left">
                
                {/* GLOBAL NAVIGATION LIST */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary font-headline flex items-center gap-1.5 leading-none">
                    <Navigation className="w-3.5 h-3.5" />
                    Global Portal Access
                  </span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant">Portal Home</span>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + H</kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant">About Dossier</span>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + A</kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant">Committees Mandate</span>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + C</kbd>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <span className="text-xs font-semibold text-on-surface-variant">Credential Roster</span>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + R</kbd>
                    </div>
                  </div>
                </div>

                {/* STEPS TIMELINE WORKFLOWS (Only fully valid on Registration Page) */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary font-headline flex items-center gap-1.5 leading-none">
                    <Shield className="w-3.5 h-3.5" />
                    Interactive Geopolitical Blueprint Registration
                  </span>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">Next Milestone / Lock and Submit</span>
                        <span className="text-[10px] text-on-surface-variant/70 font-body">Save draft, validate requirements & compile next step.</span>
                      </div>
                      <div className="flex gap-1.5">
                        <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Ctrl</kbd>
                        <span className="text-xs font-black self-center text-on-surface-variant">+</span>
                        <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Enter</kbd>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">Sovereign Autofill Data Loader</span>
                        <span className="text-[10px] text-on-surface-variant/70 font-body">Load simulated high-fidelity UN delegate dossier instantly.</span>
                      </div>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + D</kbd>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-semibold text-on-surface">Previous Step</span>
                          <span className="text-[10px] text-on-surface-variant/70 font-body">Retreat one node back</span>
                        </div>
                        <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200/70 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + P</kbd>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-semibold text-on-surface">Arrow Controls</span>
                          <span className="text-[10px] text-on-surface-variant/70 font-body">When inputs are unfocused</span>
                        </div>
                        <div className="flex gap-1">
                          <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">←</kbd>
                          <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">→</kbd>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">Jump-Nodes Straightaway</span>
                        <span className="text-[10px] text-on-surface-variant/70 font-body">Navigate directly to Step Node [1-4] instantly if validated.</span>
                      </div>
                      <div className="flex gap-1.5">
                        <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + [1-4]</kbd>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EXTRA UTILITIES */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary font-headline flex items-center gap-1.5 leading-none">
                    <Sparkles className="w-3.5 h-3.5" />
                    Special Operations
                  </span>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-on-surface">Purge Draft Cache</span>
                        <span className="text-[10px] text-on-surface-variant/70 font-body">Clear system memory</span>
                      </div>
                      <kbd className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-xs font-mono font-bold text-on-surface">Alt + X</kbd>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/20 rounded-xl">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-on-surface">Toggle HUD Card</span>
                        <span className="text-[10px] text-on-surface-variant/70 font-body">Toggle help menu</span>
                      </div>
                      <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800/50 p-0.5 rounded-lg">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-[10px] font-mono font-bold text-on-surface">?</kbd>
                        <span className="text-[10px] text-on-surface font-bold self-center px-0.5">/</span>
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg text-[10px] font-mono font-bold text-on-surface">Alt+S</kbd>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Console Footprint Indicator (Pure architectural honesty) */}
              <div className="mt-8 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/30 flex items-center justify-between text-[10px] font-mono text-on-surface-variant/60">
                <span>COMMAND_HUB: RESOLVED</span>
                <span>BUILD: v0.9.11</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
