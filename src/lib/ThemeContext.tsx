import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AppTheme = 'dark' | 'light';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export function useAppTheme() { return useContext(ThemeContext); }

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(() => (localStorage.getItem('webcraft_app_theme') as AppTheme) || 'dark');

  useEffect(() => {
    localStorage.setItem('webcraft_app_theme', theme);
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
