
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  name: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  muted: string;
  mutedForeground: string;
}

const predefinedThemes: ThemeColors[] = [
  {
    name: 'Purple Magic',
    primary: 'hsl(260 100% 65%)',
    primaryDark: 'hsl(260 80% 55%)',
    primaryLight: 'hsl(260 100% 75%)',
    background: 'hsl(0 0% 0%)',
    foreground: 'hsl(200 6.6667% 91.1765%)',
    card: 'hsl(228 9.8039% 10%)',
    cardForeground: 'hsl(0 0% 85.0980%)',
    accent: 'hsl(205.7143 70% 7.8431%)',
    accentForeground: 'hsl(203.7736 87.6033% 52.5490%)',
    border: 'hsl(210 5.2632% 14.9020%)',
    muted: 'hsl(0 0% 9.4118%)',
    mutedForeground: 'hsl(210 3.3898% 46.2745%)',
  },
  {
    name: 'Ocean Blue',
    primary: 'hsl(200 100% 50%)',
    primaryDark: 'hsl(200 100% 40%)',
    primaryLight: 'hsl(200 100% 60%)',
    background: 'hsl(220 20% 8%)',
    foreground: 'hsl(200 20% 90%)',
    card: 'hsl(220 15% 12%)',
    cardForeground: 'hsl(200 15% 85%)',
    accent: 'hsl(200 50% 15%)',
    accentForeground: 'hsl(200 80% 60%)',
    border: 'hsl(200 20% 20%)',
    muted: 'hsl(220 15% 15%)',
    mutedForeground: 'hsl(200 10% 60%)',
  },
  {
    name: 'Forest Green',
    primary: 'hsl(120 60% 50%)',
    primaryDark: 'hsl(120 60% 40%)',
    primaryLight: 'hsl(120 60% 60%)',
    background: 'hsl(120 20% 8%)',
    foreground: 'hsl(120 15% 90%)',
    card: 'hsl(120 15% 12%)',
    cardForeground: 'hsl(120 10% 85%)',
    accent: 'hsl(120 30% 15%)',
    accentForeground: 'hsl(120 50% 60%)',
    border: 'hsl(120 15% 20%)',
    muted: 'hsl(120 10% 15%)',
    mutedForeground: 'hsl(120 8% 60%)',
  },
  {
    name: 'Sunset Orange',
    primary: 'hsl(30 100% 50%)',
    primaryDark: 'hsl(30 100% 40%)',
    primaryLight: 'hsl(30 100% 60%)',
    background: 'hsl(20 30% 8%)',
    foreground: 'hsl(30 20% 90%)',
    card: 'hsl(20 20% 12%)',
    cardForeground: 'hsl(30 15% 85%)',
    accent: 'hsl(30 40% 15%)',
    accentForeground: 'hsl(30 70% 60%)',
    border: 'hsl(30 20% 20%)',
    muted: 'hsl(20 15% 15%)',
    mutedForeground: 'hsl(30 10% 60%)',
  },
  {
    name: 'Pink Dream',
    primary: 'hsl(320 80% 60%)',
    primaryDark: 'hsl(320 80% 50%)',
    primaryLight: 'hsl(320 80% 70%)',
    background: 'hsl(320 20% 8%)',
    foreground: 'hsl(320 15% 90%)',
    card: 'hsl(320 15% 12%)',
    cardForeground: 'hsl(320 10% 85%)',
    accent: 'hsl(320 30% 15%)',
    accentForeground: 'hsl(320 60% 60%)',
    border: 'hsl(320 15% 20%)',
    muted: 'hsl(320 10% 15%)',
    mutedForeground: 'hsl(320 8% 60%)',
  },
  {
    name: 'Electric Cyan',
    primary: 'hsl(180 100% 50%)',
    primaryDark: 'hsl(180 100% 40%)',
    primaryLight: 'hsl(180 100% 60%)',
    background: 'hsl(200 30% 8%)',
    foreground: 'hsl(180 20% 90%)',
    card: 'hsl(200 20% 12%)',
    cardForeground: 'hsl(180 15% 85%)',
    accent: 'hsl(180 40% 15%)',
    accentForeground: 'hsl(180 70% 60%)',
    border: 'hsl(180 20% 20%)',
    muted: 'hsl(200 15% 15%)',
    mutedForeground: 'hsl(180 10% 60%)',
  },
  {
    name: 'Royal Purple',
    primary: 'hsl(280 80% 60%)',
    primaryDark: 'hsl(280 80% 50%)',
    primaryLight: 'hsl(280 80% 70%)',
    background: 'hsl(280 20% 8%)',
    foreground: 'hsl(280 15% 90%)',
    card: 'hsl(280 15% 12%)',
    cardForeground: 'hsl(280 10% 85%)',
    accent: 'hsl(280 30% 15%)',
    accentForeground: 'hsl(280 60% 60%)',
    border: 'hsl(280 15% 20%)',
    muted: 'hsl(280 10% 15%)',
    mutedForeground: 'hsl(280 8% 60%)',
  },
  {
    name: 'Neon Lime',
    primary: 'hsl(80 100% 50%)',
    primaryDark: 'hsl(80 100% 40%)',
    primaryLight: 'hsl(80 100% 60%)',
    background: 'hsl(80 20% 8%)',
    foreground: 'hsl(80 15% 90%)',
    card: 'hsl(80 15% 12%)',
    cardForeground: 'hsl(80 10% 85%)',
    accent: 'hsl(80 30% 15%)',
    accentForeground: 'hsl(80 60% 60%)',
    border: 'hsl(80 15% 20%)',
    muted: 'hsl(80 10% 15%)',
    mutedForeground: 'hsl(80 8% 60%)',
  }
];

interface ThemeContextType {
  currentTheme: ThemeColors;
  availableThemes: ThemeColors[];
  setTheme: (theme: ThemeColors) => void;
  generateRandomTheme: () => void;
  resetToDefault: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 60) + 40; // 40-100%
  const lightness = Math.floor(Math.random() * 40) + 30; // 30-70%
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

const generateRandomTheme = (): ThemeColors => {
  const baseHue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 60) + 40;
  
  return {
    name: 'Random Theme',
    primary: `hsl(${baseHue} ${saturation}% 55%)`,
    primaryDark: `hsl(${baseHue} ${saturation}% 45%)`,
    primaryLight: `hsl(${baseHue} ${saturation}% 65%)`,
    background: `hsl(${baseHue} 20% 8%)`,
    foreground: `hsl(${baseHue} 15% 90%)`,
    card: `hsl(${baseHue} 15% 12%)`,
    cardForeground: `hsl(${baseHue} 10% 85%)`,
    accent: `hsl(${baseHue} 30% 15%)`,
    accentForeground: `hsl(${baseHue} 60% 60%)`,
    border: `hsl(${baseHue} 15% 20%)`,
    muted: `hsl(${baseHue} 10% 15%)`,
    mutedForeground: `hsl(${baseHue} 8% 60%)`,
  };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(predefinedThemes[0]);

  const applyTheme = (theme: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--foreground', theme.foreground);
    root.style.setProperty('--card', theme.card);
    root.style.setProperty('--card-foreground', theme.cardForeground);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-foreground', theme.accentForeground);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--muted-foreground', theme.mutedForeground);
  };

  const setTheme = (theme: ThemeColors) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
  };

  const handleGenerateRandomTheme = () => {
    const randomTheme = generateRandomTheme();
    setTheme(randomTheme);
  };

  const handleResetToDefault = () => {
    setTheme(predefinedThemes[0]);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
        applyTheme(parsedTheme);
      } catch {
        // If saved theme is corrupted, reset to default
        setCurrentTheme(predefinedThemes[0]);
        applyTheme(predefinedThemes[0]);
        localStorage.setItem('selectedTheme', JSON.stringify(predefinedThemes[0]));
      }
    } else {
      // First time visitor - set default theme
      setCurrentTheme(predefinedThemes[0]);
      applyTheme(predefinedThemes[0]);
      localStorage.setItem('selectedTheme', JSON.stringify(predefinedThemes[0]));
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: predefinedThemes,
        setTheme,
        generateRandomTheme: handleGenerateRandomTheme,
        resetToDefault: handleResetToDefault,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
