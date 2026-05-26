import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SEO } from '../../components/SEO';

const DRAWER_WIDTH = 260;

export function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleMenuToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SEO title="HoGrow - Dashboard" />
      <Header onMenuToggle={handleMenuToggle} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 9,
          px: { xs: 2, sm: 3 },
          pb: 3,
          ml: !isMobile && sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Box>
    </Box>
  );
}
