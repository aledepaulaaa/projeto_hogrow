import { Box } from '@mui/material';
import { ACTIVE_STATES } from './hotelData';
import { STATE_PATHS, LABEL_COORDINATES } from './statePaths';

interface BrazilMapProps {
  onStateClick: (stateId: string) => void;
}

/**
 * SVG dos paths dos estados brasileiros de alta qualidade.
 * Estados com hoteis HoGrow sao destacados em amarelo (#FFAA01).
 * Ao clicar em um estado ativo, dispara onStateClick(stateId).
 */
export function BrazilMap({ onStateClick }: BrazilMapProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto' }}>
      <svg
        viewBox="0 0 613 639"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        {Object.entries(STATE_PATHS).map(([id, path]) => {
          const isActive = ACTIVE_STATES.includes(id);
          const labelCoords = LABEL_COORDINATES[id] || { x: 300, y: 300 };
          return (
            <g key={id}>
              <path
                d={path}
                fill={isActive ? '#FFAA01' : '#2A3F7A'}
                stroke="#141E3D"
                strokeWidth={1.2}
                style={{
                  cursor: isActive ? 'pointer' : 'default',
                  transition: 'fill 0.2s ease, transform 0.15s ease',
                }}
                onClick={() => isActive && onStateClick(id)}
                onMouseEnter={(e) => {
                  if (isActive) (e.target as SVGPathElement).style.fill = '#FFD54F';
                }}
                onMouseLeave={(e) => {
                  if (isActive) (e.target as SVGPathElement).style.fill = '#FFAA01';
                }}
              />
              {/* Renderiza o label apenas para estados ativos para manter o mapa limpo e elegante */}
              {isActive && (
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  stroke="#1D2C5C"
                  strokeWidth="2.5px"
                  paintOrder="stroke fill"
                  fontSize={15}
                  fontWeight={900}
                  style={{ pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}
                >
                  {id}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Box>
  );
}
