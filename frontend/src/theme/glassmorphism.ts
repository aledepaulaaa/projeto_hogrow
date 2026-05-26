import type { SxProps, Theme } from '@mui/material/styles';

export const glassBackground = (mode: 'light' | 'dark'): SxProps<Theme> => ({
  background:
    mode === 'dark'
      ? 'rgba(29, 44, 92, 0.65)'
      : 'rgba(255, 255, 255, 0.55)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border:
    mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(29, 44, 92, 0.08)',
  boxShadow:
    mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.25)'
      : '0 8px 32px rgba(29, 44, 92, 0.1)',
});

export const glassCard = (mode: 'light' | 'dark'): SxProps<Theme> => ({
  ...glassBackground(mode),
  borderRadius: '18px',
  padding: 3,
});

export const glassCardSubtle = (mode: 'light' | 'dark'): SxProps<Theme> => ({
  background:
    mode === 'dark'
      ? 'rgba(29, 44, 92, 0.4)'
      : 'rgba(255, 255, 255, 0.35)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border:
    mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(29, 44, 92, 0.05)',
  borderRadius: '18px',
  padding: 2,
});

export const glassCardStrong = (mode: 'light' | 'dark'): SxProps<Theme> => ({
  background:
    mode === 'dark'
      ? 'rgba(29, 44, 92, 0.85)'
      : 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border:
    mode === 'dark'
      ? '1px solid rgba(255, 170, 1, 0.15)'
      : '1px solid rgba(29, 44, 92, 0.12)',
  boxShadow:
    mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.35)'
      : '0 12px 40px rgba(29, 44, 92, 0.15)',
  borderRadius: '18px',
  padding: 3,
});
