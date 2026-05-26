import { useState, useCallback } from 'react';
import type { RoulettePrize } from '../types/roulette.types';
import { PRIZE_COLORS } from '../theme/prizeColors';

export function useRoulette(prizeLabels: string[], onSpinComplete?: (prize: RoulettePrize) => void) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePrize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const prizes: RoulettePrize[] = prizeLabels.map((label, i) => ({
    id: i,
    label,
    color: PRIZE_COLORS[i % PRIZE_COLORS.length].color,
    textColor: PRIZE_COLORS[i % PRIZE_COLORS.length].textColor,
  }));

  const spin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    const winnerIndex = Math.floor(Math.random() * prizes.length);
    const sliceAngle = 360 / prizes.length;
    const extraRotations = (3 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = 360 - (winnerIndex * sliceAngle + sliceAngle / 2);
    const finalRotation = rotation + extraRotations + targetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      const wonPrize = prizes[winnerIndex];
      setIsSpinning(false);
      setResult(wonPrize);
      setShowResult(true);
      if (onSpinComplete) {
        onSpinComplete(wonPrize);
      }
    }, 4500);
  }, [isSpinning, prizes, rotation, onSpinComplete]);

  const reset = useCallback(() => {
    setShowResult(false);
    setResult(null);
  }, []);

  return { prizes, isSpinning, result, rotation, showResult, spin, reset };
}
