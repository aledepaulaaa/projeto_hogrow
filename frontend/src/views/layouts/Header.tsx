import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useIntlayer } from 'react-intlayer';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { LocaleSwitcher } from '../../components/LocaleSwitcher';
import { useThemeMode } from '../../hooks/useThemeMode';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { mode, toggleTheme } = useThemeMode();
  const { user, logout } = useAuth();
  const content = useIntlayer('header');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleChangePasswordClick = async () => {
    handleMenuClose();
    if (user?.email) {
      try {
        await api.post('/auth/forgot-password', { email: user.email });
        alert('Enviamos um link de redefinição de senha para o seu e-mail no Mailtrap!');
      } catch (err) {
        console.error(err);
        alert('Erro ao tentar redefinir senha. Tente novamente.');
      }
    }
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U';

  // Heuristica de genero: nomes femininos em PT geralmente terminam em 'a'
  const firstName = user?.name?.trim().split(' ')[0] || '';
  const isFemale = firstName.toLowerCase().endsWith('a');
  const greeting = isFemale ? content.welcomeFemale : content.welcomeMale;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background:
          mode === 'dark'
            ? 'rgba(20, 30, 61, 0.85)'
            : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor:
          mode === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(29, 44, 92, 0.06)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onMenuToggle}
            edge="start"
            id="menu-toggle-button"
            aria-label="Toggle menu"
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Logo width={120} />
          {user && (
            <Typography
              variant="body2"
              sx={{
                ml: 1.5,
                fontWeight: 500,
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {greeting as any}, {firstName}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocaleSwitcher />
          <Tooltip title={content.toggleTheme}>
            <IconButton
              onClick={toggleTheme}
              id="theme-toggle-button"
              aria-label="Toggle theme"
              sx={{ color: 'text.primary' }}
            >
              {mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={handleMenuOpen}
            id="user-menu-button"
            aria-label="User menu"
            sx={{ ml: 0.5 }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              {userInitial}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: '14px',
                  background:
                    mode === 'dark'
                      ? 'rgba(29, 44, 92, 0.95)'
                      : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                },
              },
            }}
          >
            <MenuItem onClick={handleChangePasswordClick} id="menu-change-password">
              <ListItemIcon>
                <LockOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{content.changePassword}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleProfileClick} id="menu-profile">
              <ListItemIcon>
                <PersonOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{content.profile}</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} id="menu-logout">
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{content.logout}</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
