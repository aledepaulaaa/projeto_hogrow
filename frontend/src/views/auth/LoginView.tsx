import { useState, type FormEvent } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink, Alert, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import { GlassCard } from '../../components/GlassCard';
import { Logo } from '../../components/Logo';
import { LocaleSwitcher } from '../../components/LocaleSwitcher';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { handleApiError } from '../../utils/handleApiError';

export function LoginView() {
  const content = useIntlayer('login-view');
  const apiErrors = useIntlayer('api-errors');
  const { login } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(handleApiError(err, apiErrors));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #141E3D 0%, #1D2C5C 50%, #2A3F7A 100%)'
          : 'linear-gradient(135deg, #EFEFEF 0%, #FFFFFF 50%, #E8E8E8 100%)',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 0.5 }}>
        <LocaleSwitcher />
        <Tooltip title={String(content.title)}>
          <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
            {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <GlassCard
          variant="strong"
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Logo width={150} />
          </Box>

          <Typography variant="h5" align="center" sx={{ fontWeight: 700 }} gutterBottom>
            {content.title as any}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {content.subtitle as any}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              id="login-email"
              label={content.email as any}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="login-password"
              label={content.password as any}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              sx={{ mb: 1 }}
              slotProps={{ input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <MuiLink component={Link} to="/forgot-password" underline="hover" variant="body2" color="secondary.main" sx={{ fontWeight: 600 }}>
                {(content.forgotPassword as any) || 'Esqueci minha senha'}
              </MuiLink>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={loading}
              id="login-submit-button"
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                mb: 2,
                boxShadow: '0 4px 20px rgba(255, 170, 1, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 28px rgba(255, 170, 1, 0.45)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (content.loginButton as any)}
            </Button>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
            {content.noAccount as any}{' '}
            <MuiLink component={Link} to="/register" underline="hover" sx={{ fontWeight: 600 }}>
              {content.registerLink as any}
            </MuiLink>
          </Typography>
        </GlassCard>
      </motion.div>
    </Box>
  );
}
