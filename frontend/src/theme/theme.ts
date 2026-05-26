import { createTheme, type ThemeOptions } from '@mui/material/styles';

const palette = {
  white: '#EFEFEF',
  blue: '#1D2C5C',
  blueLight: '#2A3F7A',
  blueDark: '#141E3D',
  yellow: '#FFAA01',
  yellowLight: '#FFBE3D',
  yellowDark: '#E69500',
} as const;

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Aleo", serif', fontWeight: 700 },
    h2: { fontFamily: '"Aleo", serif', fontWeight: 700 },
    h3: { fontFamily: '"Aleo", serif', fontWeight: 600 },
    h4: { fontFamily: '"Aleo", serif', fontWeight: 600 },
    h5: { fontFamily: '"Aleo", serif', fontWeight: 500 },
    h6: { fontFamily: '"Aleo", serif', fontWeight: 500 },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  spacing: (factor: number) => `${factor * 9.5}px`,
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 18,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 18,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: palette.blue,
      light: palette.blueLight,
      dark: palette.blueDark,
      contrastText: palette.white,
    },
    secondary: {
      main: palette.yellow,
      light: palette.yellowLight,
      dark: palette.yellowDark,
      contrastText: palette.blue,
    },
    background: {
      default: palette.white,
      paper: '#FFFFFF',
    },
    text: {
      primary: palette.blue,
      secondary: '#4A5568',
    },
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: palette.yellow,
      light: palette.yellowLight,
      dark: palette.yellowDark,
      contrastText: palette.blue,
    },
    secondary: {
      main: palette.blue,
      light: palette.blueLight,
      dark: palette.blueDark,
      contrastText: palette.white,
    },
    background: {
      default: palette.blueDark,
      paper: palette.blue,
    },
    text: {
      primary: palette.white,
      secondary: '#B0BEC5',
    },
  },
});

export { palette };
