import { Box, Typography, Button, Modal } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntlayer } from 'react-intlayer';
import { GlassCard } from '../../components/GlassCard';
import { ConfettiOverlay } from '../../components/ConfettiOverlay';
import type { RoulettePrize } from '../../types/roulette.types';

interface RouletteResultProps {
  open: boolean;
  prize: RoulettePrize | null;
  onPlayAgain: () => void;
}

export function RouletteResult({ open, prize, onPlayAgain }: RouletteResultProps) {
  const content = useIntlayer('roulette-view');

  if (!prize) return null;

  return (
    <>
      <ConfettiOverlay fire={open} />
      <Modal open={open} onClose={onPlayAgain}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            px: 2,
          }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              >
                <GlassCard
                  variant="strong"
                  sx={{
                    textAlign: 'center',
                    py: 5,
                    px: 4,
                    maxWidth: 400,
                    mx: 'auto',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {content.congratulations}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }} color="text.secondary" gutterBottom>
                    {content.youWon}
                  </Typography>
                  <Box
                    sx={{
                      my: 3,
                      py: 2,
                      px: 3,
                      borderRadius: '14px',
                      bgcolor: prize.color,
                      color: prize.textColor,
                      display: 'inline-block',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {prize.label}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={onPlayAgain}
                      id="play-again-button"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        boxShadow: '0 4px 20px rgba(255, 170, 1, 0.35)',
                      }}
                    >
                      {content.playAgain}
                    </Button>
                  </Box>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </>
  );
}
