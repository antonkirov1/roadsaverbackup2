
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    // Check for saved theme preference or default to system
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === "dark");
    } else {
      root.classList.add(theme);
      setIsDarkMode(theme === "dark");
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleDarkMode, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
