import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@mui/material';
import { lightTheme, darkTheme } from './theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'hogrow-theme-mode';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

  const contextValue = useMemo(
    () => ({ mode, toggleTheme }),
    [mode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
