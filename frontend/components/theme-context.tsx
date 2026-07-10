'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get saved theme or use default
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    
    // Apply theme to document
    const html = document.documentElement;
    if (savedTheme === 'light') {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
    html.style.colorScheme = savedTheme;
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      // Update HTML element
      const html = document.documentElement;
      if (newTheme === 'light') {
        html.classList.remove('light');
      } else {
        html.classList.add('light');
      }
      html.style.colorScheme = newTheme;
      
      // Save preference
      localStorage.setItem('theme', newTheme);
      
      return newTheme;
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
  if (!context) {
    throw new Error('useTheme must be used within ThemeContextProvider');
  }
  return context;
}
