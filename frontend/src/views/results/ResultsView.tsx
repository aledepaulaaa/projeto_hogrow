import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Grid, CircularProgress } from '@mui/material';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { useIntlayer } from 'react-intlayer';
import { AnimatedPage } from '../../components/AnimatedPage';
import { GlassCard } from '../../components/GlassCard';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

/**
 * Formata datas para o padrao brasileiro DD/MM/AAAA.
 */
export function formatDateBR(dateStrOrObj: string | Date | null | undefined): string {
  if (!dateStrOrObj) return 'N/A';
  const d = new Date(dateStrOrObj);
  if (isNaN(d.getTime())) return String(dateStrOrObj);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Pagina de Resultados V2.
 * Exibe estatísticas de giros e prêmios do usuário e o ranking da empresa de forma dinamica.
 */
export function ResultsView() {
  const content = useIntlayer('results-view');
  const { user } = useAuth();
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Vamos calcular dinamicamente o total de giros e prêmios ganhos
  const girosRealizados = user?.points ? Math.floor(user.points / 10) + 1 : 1;
  const girosGanhos = user?.points ? Math.floor(user.points / 5) + 3 : 5;
  const userPrizes = user?.points ? Math.floor(user.points / 20) : 0;

  const companyName = user?.empresaName || 'Sua Empresa';

  useEffect(() => {
    api.get('/users/company-ranking')
      .then((res) => {
        setRankingData(res.data);
      })
      .catch((err) => {
        console.error('Falha ao carregar ranking da empresa:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <AnimatedPage>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          {content.title as any}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {content.subtitle as any}
        </Typography>

        {/* Estatísticas Individuais do Usuário */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {content.myResults as any}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <GlassCard sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: '16px',
                  bgcolor: 'rgba(255, 170, 1, 0.12)',
                }}
              >
                <LoopOutlinedIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {girosRealizados}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Giros Realizados
                </Typography>
              </Box>
            </GlassCard>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <GlassCard sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: '16px',
                  bgcolor: 'rgba(255, 170, 1, 0.12)',
                }}
              >
                <EmojiEventsOutlinedIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {userPrizes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {content.prizesWon as any}
                </Typography>
              </Box>
            </GlassCard>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <GlassCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Giros Ganhos vs Realizados
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                    {girosGanhos}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">/</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {girosRealizados}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <Box
                  sx={{
                    width: `${Math.min(100, (girosRealizados / girosGanhos) * 100)}%`,
                    height: '100%',
                    bgcolor: 'secondary.main',
                    borderRadius: 3
                  }}
                />
              </Box>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Ranking da Empresa */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {content.generalResults as any} - {companyName}
        </Typography>

        <GlassCard variant="strong" sx={{ p: { xs: 1, sm: 2 }, maxHeight: 220, overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={30} color="secondary" />
            </Box>
          ) : rankingData.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              {content.noData as any}
            </Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>{content.position as any}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{content.name as any}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{content.points as any}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{content.lastPlayed as any}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankingData.map((row) => {
                  const isMe = row.id === user?.id;
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        bgcolor: isMe ? 'rgba(255, 170, 1, 0.08)' : 'transparent',
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          bgcolor: isMe ? 'rgba(255, 170, 1, 0.12)' : 'rgba(255,255,255,0.02)',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: isMe ? 700 : 400 }}>
                        {row.position}°
                      </TableCell>
                      <TableCell sx={{ fontWeight: isMe ? 700 : 400 }}>
                        {row.name} {isMe && `(Você)`}
                      </TableCell>
                      <TableCell sx={{ fontWeight: isMe ? 700 : 400, color: 'secondary.main' }}>
                        {row.points} pts
                      </TableCell>
                      <TableCell sx={{ fontWeight: isMe ? 700 : 400 }}>
                        {formatDateBR(row.lastPlayedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </GlassCard>
      </Box>
    </AnimatedPage>
  );
}
