import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid } from '@mui/material';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';
import { BrazilMap } from './BrazilMap';
import { StateModal } from './StateModal';
import { getHotelsByStateId } from './hotelData';
import type { BrazilState } from '../../types/portfolio.types';
import { PARTNER_LOGOS } from './logos';

/**
 * Pagina Portfolio HoGrow V2.
 * Duas abas: "Mapa" (mapa SVG interativo) e "Parceiros".
 */
export function PortfolioView() {
  const content = useIntlayer('portfolio-view');
  const [tab, setTab] = useState(0);
  const [selectedState, setSelectedState] = useState<BrazilState | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  /** Ao clicar em um estado no mapa, abre o modal com os hoteis */
  const handleStateClick = (stateId: string) => {
    const state = getHotelsByStateId(stateId);
    if (state) {
      setSelectedState(state);
      setModalOpen(true);
    }
  };

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.title as any}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {content.subtitle as any}
        </Typography>

        {/* Abas Mapa / Parceiros */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label={content.mapTab as any} id="tab-map" />
          <Tab label={content.partnersTab as any} id="tab-partners" />
        </Tabs>

        {tab === 0 && (
          <GlassCard variant="strong" sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Estatisticas HoGrow */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, justifyContent: 'center' }}>
              {[content.yearsInMarket, content.partners, content.rooms].map((stat, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: 'rgba(255,170,1,0.12)',
                    borderRadius: '12px',
                    px: 2, py: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFAA01' }}>
                    {stat as any}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Instrucao */}
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              {content.clickState as any}
            </Typography>

            {/* Mapa SVG interativo */}
            <BrazilMap onStateClick={handleStateClick} />
          </GlassCard>
        )}

        {tab === 1 && (
          <GlassCard variant="strong" sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 4 }}>
              {content.ourPartners as any}
            </Typography>

            {(['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'] as const).map((region) => {
              const regionLogos = PARTNER_LOGOS.filter((p) => p.region === region);
              if (regionLogos.length === 0) return null;

              return (
                <Box key={region} sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: '#FFAA01',
                      mb: 2,
                      borderBottom: '1px solid rgba(255,170,1,0.2)',
                      pb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{region}</span>
                  </Typography>
                  <Grid container spacing={2}>
                    {regionLogos.map((partner, i) => (
                      <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '16px',
                            p: 2,
                            borderColor: 'rgba(255, 170, 1, 0.2)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            height: 100,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                              borderColor: '#FFAA01',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={partner.path}
                            alt={partner.name}
                            sx={{
                              maxWidth: '85%',
                              maxHeight: '50%',
                              objectFit: 'contain',
                              mb: 1,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: 'rgba(255,255,255,0.8)',
                              fontSize: '0.75rem',
                              textAlign: 'center',
                              px: 0.5,
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              width: '100%',
                            }}
                          >
                            {partner.name}
                          </Typography>
                          {/* Tag de Estado */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: 'rgba(255, 170, 1, 0.15)',
                              color: '#FFAA01',
                              borderRadius: '4px',
                              px: 0.8,
                              py: 0.2,
                              fontSize: '0.65rem',
                              fontWeight: 800,
                            }}
                          >
                            {partner.state}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })}
          </GlassCard>
        )}

        {/* Modal de hoteis do estado selecionado */}
        <StateModal
          state={selectedState}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeLabel={String(content.close)}
        />
      </Box>
    </AnimatedPage>
  );
}
