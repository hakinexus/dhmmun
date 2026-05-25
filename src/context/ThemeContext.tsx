import React, { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return 'light'; // Default baseline is pristine Light Mode
  });

  // useLayoutEffect guarantees synchronous DOM mutation immediately after state change
  // This is required for View Transitions to instantly see the new state
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d141d' : '#f0edee'); // Match background colors
  }, [theme]);

  const toggleTheme = () => {
    // flushSync forces React to commit the state & layout effect instantly
    // preventing the View Transition API from snapping an intermediate state
    flushSync(() => {
      setTheme((prev) => {
        const nextTheme = prev === 'dark' ? 'light' : 'dark';
        // Persist the explicit manual override instantly
        localStorage.setItem('theme', nextTheme);
        return nextTheme;
      });
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
