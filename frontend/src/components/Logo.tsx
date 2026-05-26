import { Box, type SxProps, type Theme } from '@mui/material';
import { useThemeMode } from '../hooks/useThemeMode';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  sx?: SxProps<Theme>;
}

export function Logo({ width = 160, height = 'auto', sx = {} }: LogoProps) {
  const { mode } = useThemeMode();

  const logoSrc =
    mode === 'dark'
      ? '/logo-hogrow-light.svg'
      : '/logo-hogrow-dark.svg';

  return (
    <Box
      component="img"
      src={logoSrc}
      alt="HoGrow"
      sx={{
        width,
        height,
        objectFit: 'contain',
        ...sx,
      }}
    />
  );
}
