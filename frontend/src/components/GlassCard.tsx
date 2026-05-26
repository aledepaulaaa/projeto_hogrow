import { Box, type SxProps, type Theme } from '@mui/material';
import { useThemeMode } from '../hooks/useThemeMode';
import {
  glassCard,
  glassCardSubtle,
  glassCardStrong,
} from '../theme/glassmorphism';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'subtle' | 'strong';
  sx?: SxProps<Theme> | any;
}

const variantMap = {
  default: glassCard,
  subtle: glassCardSubtle,
  strong: glassCardStrong,
} as const;

export function GlassCard({
  children,
  variant = 'default',
  sx = {},
}: GlassCardProps) {
  const { mode } = useThemeMode();
  const glassSx = variantMap[variant](mode);

  return <Box sx={{ ...glassSx, ...sx }}>{children}</Box>;
}
