import type { BrazilState } from '../../types/portfolio.types';

/**
 * Dados estaticos dos hoteis HoGrow organizados por estado brasileiro.
 * Fonte: especificacoes.md V2 (Campanha Copa do Mundo 2026).
 */
export const hotelData: BrazilState[] = [
  {
    id: 'AM', name: 'Amazonas',
    regionalidade: ['Norte Amazonense', 'Sul Amazonense', 'Centro Amazonense', 'Sudoeste Amazonense'],
  },
  {
    id: 'PA', name: 'Para',
    regionalidade: ['Baixo Amazonas', 'Nordeste Paraense', 'Sudeste Paraense', 'Sudoeste Paraense', 'Região Metropolitana de Belém'],
  },
  {
    id: 'PI', name: 'Piaui',
    regionalidade: ['Norte Piauiense', 'Centro-Norte Piauiense', 'Sudoeste Piauiense', 'Sudeste Piauiense'],
  },
  {
    id: 'CE', name: 'Ceara',
    regionalidade: ['Noroeste Cearense', 'Norte Cearense', 'Sertões Cearenses', 'Jaguaribe', 'Centro-Sul Cearense', 'Sul Cearense'],
  },
  {
    id: 'PB', name: 'Paraiba',
    regionalidade: ['Sertão Paraibano', 'Borborema', 'Agreste Paraibano', 'Mata Paraibana'],
  },
  {
    id: 'PE', name: 'Pernambuco',
    regionalidade: ['Sertão Pernambucano', 'Agreste Pernambucano', 'Mata Pernambucana', 'Região Metropolitana do Recife'],
  },
  {
    id: 'AL', name: 'Alagoas',
    regionalidade: ['Sertão Alagoano', 'Agreste Alagoano', 'Leste Alagoano'],
  },
  {
    id: 'BA', name: 'Bahia',
    regionalidade: ['Oeste Baiano', 'Centro-Norte Baiano', 'Nordeste Baiano', 'Centro-Sul Baiano', 'Sul Baiano', 'Região Metropolitana de Salvador'],
  },
  {
    id: 'RJ', name: 'Rio de Janeiro',
    regionalidade: ['Noroeste Fluminense', 'Norte Fluminense', 'Centro Fluminense', 'Sul Fluminense', 'Metropolitana do Rio de Janeiro'],
  },
  {
    id: 'SP', name: 'Sao Paulo',
    regionalidade: ['Macro Metropolitana Paulista', 'Vale do Paraíba Paulista', 'Litoral Sul Paulista', 'Centro-Sul', 'Oeste', 'Leste', 'Sudeste', 'Noroeste Paulista', 'Metropolitana de São Paulo'],
  },
  {
    id: 'RS', name: 'Rio Grande do Sul',
    regionalidade: ['Noroeste Rio-Grandense', 'Nordeste Rio-Grandense', 'Centro Ocidental', 'Centro Oriental', 'Metropolitana de Porto Alegre', 'Sudoeste', 'Sudeste'],
  },
  {
    id: 'MG', name: 'Minas Gerais',
    regionalidade: ['Noroeste de Minas', 'Norte de Minas', 'Triângulo Mineiro', 'Oeste de Minas', 'Sul e Sudoeste de Minas', 'Zona da Mata', 'Metropolitana de Belo Horizonte'],
  },
  {
    id: 'MT', name: 'Mato Grosso',
    regionalidade: ['Norte Mato-Grossense', 'Nordeste Mato-Grossense', 'Sudoeste Mato-Grossense', 'Centro-Sul', 'Sudeste Mato-Grossense'],
  },
];

/** IDs dos estados que possuem hoteis HoGrow (destacados em amarelo no mapa) */
export const ACTIVE_STATES = hotelData.map((s) => s.id);

/** Busca os hoteis de um estado pelo ID (sigla UF) */
export function getHotelsByStateId(stateId: string): BrazilState | undefined {
  return hotelData.find((s) => s.id === stateId);
}

/** Retorna a regiao correspondente de um estado */
export function getStateRegion(stateId: string): string {
  const mapping: Record<string, string> = {
    AM: 'Norte',
    PA: 'Norte',
    PI: 'Nordeste',
    CE: 'Nordeste',
    PB: 'Nordeste',
    PE: 'Nordeste',
    AL: 'Nordeste',
    BA: 'Nordeste',
    RJ: 'Sudeste',
    SP: 'Sudeste',
    MG: 'Sudeste',
    RS: 'Sul',
    MT: 'Centro-Oeste',
  };
  return mapping[stateId] || 'Norte';
}
