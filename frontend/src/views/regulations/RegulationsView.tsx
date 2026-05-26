import { Box, Typography } from '@mui/material';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';

/**
 * Pagina de Regulamento V2.
 * Placeholder ate que o regulamento oficial seja publicado.
 */
export function RegulationsView() {
  const content = useIntlayer('regulations-view');

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 700, mx: 'auto', py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.title as any}
        </Typography>

        <GlassCard variant="strong" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#FFAA01', mb: 2 }}>
            {content.subtitle as any}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {content.description as any}
          </Typography>
        </GlassCard>
      </Box>
    </AnimatedPage>
  );
}
