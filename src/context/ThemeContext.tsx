import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'original' | 'cute' | 'dreamy' | 'devil' | 'sakura' | 'candy';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  toastText: string;
  badge: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  original: {
    id: 'original',
    name: 'Original',
    toastText: 'Back to the original ✨',
    badge: '✨',
  },
  cute: {
    id: 'cute',
    name: 'Cute Pink',
    toastText: 'Cute mode activated! 🎀',
    badge: '🎀',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy',
    toastText: 'Entering dream mode... 🌙✨',
    badge: '🌙',
  },
  devil: {
    id: 'devil',
    name: 'Dark Devil',
    toastText: 'Devil mode awakened 🔥',
    badge: '🔥',
  },
  sakura: {
    id: 'sakura',
    name: 'Sakura',
    toastText: 'Sakura mode 🌸',
    badge: '🌸',
  },
  candy: {
    id: 'candy',
    name: 'Candy Pastel',
    toastText: 'Candy mode! 🍭✨',
    badge: '🍭',
  },
};

export const THEME_ORDER: ThemeMode[] = [
  'original',
  'cute',
  'dreamy',
  'devil',
  'sakura',
  'candy',
];

interface ThemeContextType {
  theme: ThemeMode;
  cycleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  toastMessage: string | null;
  clickBurst: number;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'original',
  cycleTheme: () => {},
  setTheme: () => {},
  toastMessage: null,
  clickBurst: 0,
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'portfolio-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode;
      if (saved && THEME_ORDER.includes(saved)) {
        return saved;
      }
    }
    return 'original';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [clickBurst, setClickBurst] = useState<number>(0);

  // Apply data-theme attribute on document root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const cycleTheme = useCallback(() => {
    setClickBurst((prev) => prev + 1);
    setThemeState((prevTheme) => {
      const currentIndex = THEME_ORDER.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
      const nextTheme = THEME_ORDER[nextIndex];
      showToast(THEMES[nextTheme].toastText);
      return nextTheme;
    });
  }, [showToast]);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      if (THEME_ORDER.includes(mode)) {
        setThemeState(mode);
        showToast(THEMES[mode].toastText);
      }
    },
    [showToast]
  );

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setTheme, toastMessage, clickBurst }}>
      {children}
    </ThemeContext.Provider>
  );
};
