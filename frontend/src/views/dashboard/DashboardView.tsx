import { Box, Typography, Button, Grid } from '@mui/material';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { useNavigate } from 'react-router-dom';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';
import { useAuth } from '../../hooks/useAuth';

export function DashboardView() {
  const content = useIntlayer('dashboard-view');
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.welcome}{user?.name ? `, ${user.name}` : ''}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {content.subtitle}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <GlassCard
              variant="strong"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 5,
                textAlign: 'center',
                minHeight: 260,
              }}
            >
              <CasinoOutlinedIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                {content.quickAccess}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                id="dashboard-play-roulette"
                onClick={() => navigate('/roulette')}
                startIcon={<CasinoOutlinedIcon />}
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 24px rgba(255, 170, 1, 0.35)',
                  '&:hover': {
                    boxShadow: '0 6px 32px rgba(255, 170, 1, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                {content.playRoulette}
              </Button>
            </GlassCard>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              <GlassCard sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <LoopOutlinedIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>0</Typography>
                  <Typography variant="body2" color="text.secondary">{content.totalSpins}</Typography>
                </Box>
              </GlassCard>
              <GlassCard sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEventsOutlinedIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>0</Typography>
                  <Typography variant="body2" color="text.secondary">{content.prizesWon}</Typography>
                </Box>
              </GlassCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AnimatedPage>
  );
}
