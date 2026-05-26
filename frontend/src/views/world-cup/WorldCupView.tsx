import { Box, Typography } from '@mui/material';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';
import { ReservationForm } from './ReservationForm';

/**
 * Pagina Campanha Copa do Mundo V2.
 * Hero com frase de destaque + formulario de reservas.
 * A roleta fica na rota /roulette separada.
 */
export function WorldCupView() {
  const content = useIntlayer('world-cup-view');

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
        {/* Hero da Copa do Mundo */}
        <GlassCard variant="strong" sx={{ p: { xs: 3, sm: 4 }, mb: 3, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, lineHeight: 1.4, mb: 2 }}
          >
            {content.heroLine1 as any}{' '}
            <Box component="span" sx={{ color: '#FFAA01', fontWeight: 800 }}>
              {content.heroHighlight1 as any}
            </Box>{' '}
            {content.heroLine2 as any}{' '}
            <Box component="span" sx={{ color: '#009C3B', fontWeight: 800 }}>
              {content.heroHighlight2 as any}
            </Box>{' '}
            {content.heroLine3 as any}{' '}
            <Box component="span" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#60A5FA' : '#002776', fontWeight: 800 }}>
              {content.heroHighlight3 as any}
            </Box>
          </Typography>

          {/* Giros disponiveis */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255,170,1,0.15)',
              borderRadius: '22px',
              px: 3, py: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFAA01' }}>0</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {content.spinsAvailable as any}
            </Typography>
          </Box>
        </GlassCard>

        {/* Formulario de reserva */}
        <GlassCard variant="strong" sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {content.reservation as any}
          </Typography>
          <ReservationForm />
        </GlassCard>
      </Box>
    </AnimatedPage>
  );
}
