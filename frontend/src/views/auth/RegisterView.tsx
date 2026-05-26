import { useState, type FormEvent } from 'react';
import {
  Box, TextField, Button, Typography, Link as MuiLink,
  Alert, CircularProgress, IconButton, InputAdornment,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GlassCard } from '../../components/GlassCard';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';
import { handleApiError } from '../../utils/handleApiError';

/**
 * Formulario de registro V2.
 * Campos: nome, email corporativo, telefone (+55), empresa (texto livre), senha.
 */
export function RegisterView() {
  const content = useIntlayer('register-view');
  const apiErrors = useIntlayer('api-errors');
  const { register } = useAuth();
  const { mode } = useThemeMode();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+55');
  const [empresaName, setEmpresaName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((s) => !s);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((s) => !s);
  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError(String(content.passwordMismatch));
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, passwordConfirm: confirmPassword, phone, empresaName });
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
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #141E3D 0%, #1D2C5C 50%, #2A3F7A 100%)'
          : 'linear-gradient(135deg, #EFEFEF 0%, #FFFFFF 50%, #E8E8E8 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <GlassCard variant="strong" sx={{ width: '100%', maxWidth: 420, p: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Logo width={150} />
          </Box>

          <Typography variant="h5" align="center" sx={{ fontWeight: 700 }} gutterBottom>
            {content.title as any}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            {content.subtitle as any}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Nome completo */}
            <TextField fullWidth id="register-name" label={content.name as any} value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} />

            {/* Email corporativo */}
            <TextField fullWidth id="register-email" label={content.email as any} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" sx={{ mb: 2 }} />

            {/* Telefone +55 */}
            <TextField fullWidth id="register-phone" label={content.phone as any} value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} placeholder="+5511999999999" />

            {/* Empresa (texto livre) */}
            <TextField
              fullWidth
              id="register-empresa"
              label={content.empresa as any}
              placeholder={String(content.enterEmpresa)}
              value={empresaName}
              onChange={(e) => setEmpresaName(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* Senha */}
            <TextField
              fullWidth id="register-password" label={content.password as any}
              type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 2 }}
              slotProps={{ input: { endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDown} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}}}
            />

            {/* Confirmar senha */}
            <TextField
              fullWidth id="register-confirm-password" label={content.confirmPassword as any}
              type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required sx={{ mb: 3 }}
              slotProps={{ input: { endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDown} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}}}
            />

            <Button fullWidth type="submit" variant="contained" color="secondary" size="large" disabled={loading} id="register-submit-button" sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700, mb: 2, boxShadow: '0 4px 20px rgba(255, 170, 1, 0.3)' }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (content.registerButton as any)}
            </Button>
          </Box>

          <Typography variant="body2" align="center" color="text.secondary">
            {content.hasAccount as any}{' '}
            <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 600 }}>
              {content.loginLink as any}
            </MuiLink>
          </Typography>
        </GlassCard>
      </motion.div>
    </Box>
  );
}
