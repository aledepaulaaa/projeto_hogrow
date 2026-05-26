import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiOverlayProps {
  fire: boolean;
  onComplete?: () => void;
}

export function ConfettiOverlay({ fire, onComplete }: ConfettiOverlayProps) {
  const launchConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FFAA01', '#1D2C5C', '#EFEFEF', '#FFBE3D', '#2A3F7A'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        onComplete?.();
      }
    };

    frame();
  }, [onComplete]);

  useEffect(() => {
    if (fire) {
      launchConfetti();
    }
  }, [fire, launchConfetti]);

  return null;
}
