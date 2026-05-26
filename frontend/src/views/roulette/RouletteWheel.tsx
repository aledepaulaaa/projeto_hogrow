import { Box } from '@mui/material';
import type { RoulettePrize } from '../../types/roulette.types';

interface RouletteWheelProps {
  prizes: RoulettePrize[];
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
}

export function RouletteWheel({ prizes, rotation, isSpinning, onSpin }: RouletteWheelProps) {
  const size = 440;
  const center = size / 2;
  const radius = size / 2 - 4;
  const sliceAngle = 360 / prizes.length;

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const createSlicePath = (index: number) => {
    const startAngle = index * sliceAngle;
    const endAngle = startAngle + sliceAngle;
    const start = polarToCartesian(center, center, radius, startAngle);
    const end = polarToCartesian(center, center, radius, endAngle);
    const largeArc = sliceAngle > 180 ? 1 : 0;

    return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  const getLabelPosition = (index: number) => {
    const angle = index * sliceAngle + sliceAngle / 2;
    const labelRadius = radius * 0.72; // Empurra o texto um pouco mais para a borda para mais espaço
    const pos = polarToCartesian(center, center, labelRadius, angle);
    return { x: pos.x, y: pos.y, rotation: angle };
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 290, sm: 380, md: 440 },
        height: { xs: 290, sm: 380, md: 440 },
        mx: 'auto',
        transition: 'width 0.3s ease, height 0.3s ease',
      }}
    >
      {/* Pointer */}
      <Box
        sx={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '28px solid',
          borderTopColor: 'secondary.main',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
        }}
      />

      {/* Wheel */}
      <Box
        onClick={!isSpinning ? onSpin : undefined}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          cursor: isSpinning ? 'default' : 'pointer',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
            : 'none',
          boxShadow: '0 0 40px rgba(255, 170, 1, 0.2), 0 0 0 6px rgba(255, 170, 1, 0.4), 0 0 0 12px rgba(29, 44, 92, 0.3)',
        }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          {prizes.map((prize, i) => {
            // Quebra o texto em múltiplas linhas se contiver espaços
            const lines: string[] = [];
            const rawLabel = prize.label;

            if (rawLabel.includes(' ') && rawLabel.length > 5) {
              if (rawLabel === 'Sabonete líquido') {
                lines.push('Sabonete', 'líquido');
              } else if (rawLabel === 'Suporte de celular') {
                lines.push('Suporte', 'celular');
              } else if (rawLabel === 'Caixa chocolate') {
                lines.push('Caixa', 'chocolate');
              } else if (rawLabel === 'Copos Térmico') {
                lines.push('Copos', 'Térmico');
              } else {
                const words = rawLabel.split(' ');
                if (words.length > 2) {
                  lines.push(words[0], words.slice(1).join(' '));
                } else {
                  lines.push(...words);
                }
              }
            } else {
              lines.push(rawLabel);
            }

            return (
              <g key={prize.id}>
                <path
                  d={createSlicePath(i)}
                  fill={prize.color}
                  stroke="#141E3D" // Separação escura premium entre fatias
                  strokeWidth="3.5" // Espaço maior ("quadradinhos")
                />
                <text
                  x={getLabelPosition(i).x}
                  y={getLabelPosition(i).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${getLabelPosition(i).rotation}, ${getLabelPosition(i).x}, ${getLabelPosition(i).y})`}
                  fill={prize.textColor}
                  fontSize="10.5"
                  fontWeight="900"
                  fontFamily="Inter, sans-serif"
                  stroke="#141E3D"
                  strokeWidth="3.5"
                  paintOrder="stroke fill"
                  strokeLinejoin="round"
                >
                  {lines.map((line, idx) => (
                    <tspan
                      key={idx}
                      x={getLabelPosition(i).x}
                      dy={idx === 0 ? `-${(lines.length - 1) * 5.5}px` : '11px'}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          {/* Center circle */}
          <circle cx={center} cy={center} r="24" fill="#1D2C5C" stroke="#FFAA01" strokeWidth="3" />
          <circle cx={center} cy={center} r="8" fill="#FFAA01" />
        </svg>
      </Box>
    </Box>
  );
}
