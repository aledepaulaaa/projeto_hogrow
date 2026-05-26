import { Box, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { RouletteWheel } from './RouletteWheel';
import { RouletteResult } from './RouletteResult';
import { useRoulette } from '../../hooks/useRoulette';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

export function RouletteView() {
  const content = useIntlayer('roulette-view');
  const { user, refreshProfile } = useAuth();

  const userSpins = user?.points ? Math.floor(user.points / 10) + 1 : 1;

  const prizeLabels = [
    String(content.prize1),
    String(content.prize2),
    String(content.prize3),
    String(content.prize4),
    String(content.prize5),
    String(content.prize6),
    String(content.prize7),
    String(content.prize8),
    String(content.prize9),
    String(content.prize10),
    String(content.prize11),
    String(content.prize12),
    String(content.prize13),
    String(content.prize14),
  ];

  const handleSpinComplete = async (wonPrize: any) => {
    try {
      await api.post('/users/spin', {
        prizeName: wonPrize.label,
        points: 0, // Mantém a pontuação estável após o giro
      });
      await refreshProfile();
    } catch (err) {
      console.error('Falha ao salvar histórico de giro:', err);
    }
  };

  const { prizes, isSpinning, result, rotation, showResult, spin, reset } =
    useRoulette(prizeLabels, handleSpinComplete);

  return (
    <AnimatedPage>
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {content.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {content.subtitle}
        </Typography>

        {/* Giros disponíveis no topo da roleta */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'rgba(255,170,1,0.15)',
            border: '1px solid rgba(255,170,1,0.25)',
            borderRadius: '22px',
            px: 3,
            py: 1,
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFAA01', lineHeight: 1 }}>
            {userSpins}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.9rem' }}>
            Giros disponíveis
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <RouletteWheel
            prizes={prizes}
            rotation={rotation}
            isSpinning={isSpinning}
            onSpin={spin}
          />
        </Box>

        <motion.div
          animate={isSpinning ? {} : { scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={spin}
            disabled={isSpinning}
            id="spin-button"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.15rem',
              fontWeight: 700,
              boxShadow: '0 6px 28px rgba(255, 170, 1, 0.4)',
              '&:hover': {
                boxShadow: '0 8px 36px rgba(255, 170, 1, 0.55)',
              },
            }}
          >
            {isSpinning ? content.spinning : content.spinButton}
          </Button>
        </motion.div>

        {/* Grade de Prêmios */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFAA01', mb: 2 }}>
            🏆 Prêmios Disponíveis da HoGrow
          </Typography>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {prizeLabels.slice(0, 14).map((label, idx) => (
              <Grid size={{ xs: 6, sm: 4 }} key={idx}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    p: 1.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: '#FFAA01',
                      bgcolor: 'rgba(255,170,1,0.02)',
                    }
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#FFAA01', fontWeight: 800, mb: 0.5 }}>
                    Setor {idx + 1}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', color: '#EFEFEF' }}>
                    {label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <RouletteResult
          open={showResult}
          prize={result}
          onPlayAgain={reset}
        />
      </Box>
    </AnimatedPage>
  );
}
