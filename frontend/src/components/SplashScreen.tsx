import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { useThemeMode } from '../hooks/useThemeMode';

export function SplashScreen() {
  const { mode } = useThemeMode();
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0: Mascot, 1: Logo, 2: Completed
  const [played, setPlayed] = useState(true);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('hogrow-splash-played');
    if (hasPlayed) {
      setStep(2);
      setPlayed(true);
    } else {
      setPlayed(false);
    }
  }, []);

  useEffect(() => {
    if (played) return;

    // Chuva contínua de confetes tricolores desde o primeiro momento
    const duration = 5000; // 5 segundos de confetes caindo
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 10000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(confettiInterval);
      }

      const particleCount = 35 * (timeLeft / duration);
      
      // Chuva caindo das laterais esquerdas e direitas
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#009C3B', '#FFDF00', '#002776', '#FFFFFF'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#009C3B', '#FFDF00', '#002776', '#FFFFFF'],
      });
    }, 200); // Dispara a cada 200ms para uma chuva densa e fluida

    // Sequência de transição da Splash Screen
    const mascotTimer = setTimeout(() => {
      setStep(1);
    }, 2200); // 2.2 segundos de exibição para o Canarinho

    const finishTimer = setTimeout(() => {
      setStep(2);
      sessionStorage.setItem('hogrow-splash-played', 'true');
    }, 5000); // Finaliza junto com a chuva de confetes (5.0s total)

    return () => {
      clearInterval(confettiInterval);
      clearTimeout(mascotTimer);
      clearTimeout(finishTimer);
    };
  }, [played]);

  if (step === 2) return null;

  return (
    <AnimatePresence>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: mode === 'dark' ? '#141E3D' : '#EFEFEF',
          overflow: 'hidden',
        }}
      >
        {step === 0 && (
          <motion.div
            key="mascot"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <Box
              component="img"
              src="/canarinho_pistola.png"
              alt="Mascote Canarinho"
              sx={{
                width: { xs: 200, sm: 280 },
                height: 'auto',
                filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))',
              }}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Logo width={220} />
          </motion.div>
        )}
      </Box>
    </AnimatePresence>
  );
}
