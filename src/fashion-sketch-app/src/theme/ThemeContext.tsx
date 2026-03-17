import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { darkColors, lightColors, AppColors } from './colors';

const THEME_KEY = 'app_theme';

interface ThemeContextType {
  isDark: boolean;
  colors: AppColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  colors: darkColors,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(THEME_KEY).then((val) => {
      if (val === 'light') setIsDark(false);
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await SecureStore.setItemAsync(THEME_KEY, next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
