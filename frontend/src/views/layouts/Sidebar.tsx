import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntlayer } from 'react-intlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../hooks/useThemeMode';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

/** Item de navegacao do menu lateral */
interface NavItem {
  key: string;
  path: string;
  icon: React.ReactElement;
}

/**
 * Lista de itens do menu lateral V2.
 * Removido "settings", adicionados itens da Copa do Mundo.
 */
const navItems: NavItem[] = [
  { key: 'portfolio', path: '/', icon: <BusinessCenterOutlinedIcon /> },
  { key: 'worldCup', path: '/world-cup', icon: <SportsSoccerOutlinedIcon /> },
  { key: 'roulette', path: '/roulette', icon: <CasinoOutlinedIcon /> },
  { key: 'chat', path: '/chat', icon: <ChatOutlinedIcon /> },
  { key: 'results', path: '/results', icon: <LeaderboardOutlinedIcon /> },
  { key: 'profile', path: '/profile', icon: <PersonOutlinedIcon /> },
  { key: 'regulations', path: '/regulations', icon: <GavelOutlinedIcon /> },
];

/**
 * Menu lateral com itens de navegacao animados.
 * Suporta modo mobile (Drawer temporario) e desktop (Drawer persistente).
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const content = useIntlayer('sidebar');

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box
      sx={{
        pt: 9,
        height: '100%',
        background:
          mode === 'dark'
            ? 'rgba(20, 30, 61, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <List sx={{ px: 1, pt: 1 }}>
        <AnimatePresence>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const label = content[item.key as keyof typeof content];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.25 }}
              >
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  id={`nav-${item.key}`}
                  selected={isActive}
                  sx={{
                    borderRadius: '14px',
                    mb: 0.5,
                    mx: 0.5,
                    py: 1.2,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      bgcolor:
                        mode === 'dark'
                          ? 'rgba(255, 170, 1, 0.15)'
                          : 'rgba(29, 44, 92, 0.08)',
                      '&:hover': {
                        bgcolor:
                          mode === 'dark'
                            ? 'rgba(255, 170, 1, 0.22)'
                            : 'rgba(29, 44, 92, 0.12)',
                      },
                    },
                    '&:hover': {
                      bgcolor:
                        mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(29, 44, 92, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? 'secondary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label as any}
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'text.primary' : 'text.secondary',
                    }}
                  />
                </ListItemButton>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </List>
    </Box>
  );

  // Mobile: Drawer temporario com overlay
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            border: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Desktop: Drawer persistente
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          border: 'none',
          transition: 'transform 0.3s ease',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
