import { useState, type FormEvent } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GlassCard } from '../../components/GlassCard';
import { Logo } from '../../components/Logo';
import { useThemeMode } from '../../hooks/useThemeMode';
import axios from 'axios';
import { handleApiError } from '../../utils/handleApiError';

export function ResetPasswordView() {
  const content = useIntlayer('reset-password-view');
  const apiErrors = useIntlayer('api-errors');
  const { mode } = useThemeMode();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(String(content.passwordMismatch));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await axios.post('/api/auth/reset-password', { token, newPassword: password });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(handleApiError(err, apiErrors));
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

          {status === 'success' ? (
            <Box sx={{ textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
                {content.successMessage as any}
              </Alert>
              <Button component={Link} to="/login" variant="contained" color="secondary" fullWidth sx={{ py: 1.5, fontWeight: 700 }}>
                {content.goToLogin as any}
              </Button>
            </Box>
          ) : (
            <>
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                  {errorMessage}
                </Alert>
              )}

              {!token && status !== 'loading' && status !== 'error' && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: '12px' }}>
                  Nenhum token fornecido na URL.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  id="reset-password"
                  label={content.newPassword as any}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
                <TextField
                  fullWidth
                  id="reset-confirm-password"
                  label={content.confirmNewPassword as any}
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={status === 'loading' || !token}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700, mb: 2, boxShadow: '0 4px 20px rgba(255, 170, 1, 0.3)' }}
                >
                  {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : (content.submitButton as any)}
                </Button>
              </Box>
            </>
          )}
        </GlassCard>
      </motion.div>
    </Box>
  );
}
