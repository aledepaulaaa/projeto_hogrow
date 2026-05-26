import { useState, type FormEvent } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import { GlassCard } from '../../components/GlassCard';
import { Logo } from '../../components/Logo';
import { useThemeMode } from '../../hooks/useThemeMode';
import axios from 'axios';
import { handleApiError } from '../../utils/handleApiError';

export function ForgotPasswordView() {
  const content = useIntlayer('forgot-password-view');
  const apiErrors = useIntlayer('api-errors');
  const { mode } = useThemeMode();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/auth/forgot-password', { email });
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

          {status === 'success' && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
              {content.successMessage as any}
            </Alert>
          )}

          {status === 'error' && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {errorMessage || String(content.errorInvalid)}
            </Alert>
          )}

          {status !== 'success' && (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                id="forgot-email"
                label={content.email as any}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={status === 'loading'}
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700, mb: 2, boxShadow: '0 4px 20px rgba(255, 170, 1, 0.3)' }}
              >
                {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : (content.submitButton as any)}
              </Button>
            </Box>
          )}

          <Typography variant="body2" align="center" color="text.secondary">
            <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 600 }}>
              {content.backToLogin as any}
            </MuiLink>
          </Typography>
        </GlassCard>
      </motion.div>
    </Box>
  );
}
