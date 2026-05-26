import type { BrazilState } from '../../types/portfolio.types';

/**
 * Dados estaticos dos hoteis HoGrow organizados por estado brasileiro.
 * Fonte: especificacoes.md V2 (Campanha Copa do Mundo 2026).
 */
export const hotelData: BrazilState[] = [
  {
    id: 'AM', name: 'Amazonas',
    hotels: [
      { name: 'Tropical Executive', city: 'Manaus' },
      { name: 'Mural Living Hotel', city: 'Manaus' },
    ],
  },
  {
    id: 'PA', name: 'Para',
    hotels: [
      { name: 'Hotel Coracao Verde', city: 'Alter do Chao' },
      { name: 'Amazon Park Hotel', city: 'Belem' },
    ],
  },
  {
    id: 'PI', name: 'Piaui',
    hotels: [
      { name: 'Gran Hotel Arrey', city: 'Teresina' },
      { name: 'Formula Arrey Hotel Teresina', city: 'Teresina' },
      { name: 'Hotel Express Arrey', city: 'Teresina' },
      { name: 'Executive Arrey Hotel', city: 'Teresina' },
      { name: 'Formula Arrey Hotel Urucui', city: 'Urucui' },
      { name: 'Arrey Hotel Beach', city: 'Parnaiba' },
      { name: 'Arrey Rio Poty Hotel Praia', city: 'Luis Correia' },
      { name: 'Arrey Hotel Boutique', city: 'Barra Grande' },
      { name: 'Hotel Express Arrey', city: 'Piracuruca' },
      { name: 'Hotel Express Arrey', city: 'Picos' },
      { name: 'Formula Arrey Hotel Itaueira', city: 'Itaueira' },
    ],
  },
  {
    id: 'CE', name: 'Ceara',
    hotels: [
      { name: 'Terrasa Solar Hotel', city: 'Icarai de Amontada' },
    ],
  },
  {
    id: 'PB', name: 'Paraiba',
    hotels: [
      { name: 'Hotel Manaira', city: 'Joao Pessoa' },
    ],
  },
  {
    id: 'PE', name: 'Pernambuco',
    hotels: [
      { name: 'Pousada das Galinhas', city: 'Porto de Galinhas' },
      { name: '232 Concept Rota 232', city: 'Caruaru' },
      { name: 'Pousada La na Praia', city: 'Sao Jose da Coroa Grande' },
      { name: 'Sao Jose da Coroa Grande', city: 'Sao Jose da Coroa Grande' },
    ],
  },
  {
    id: 'AL', name: 'Alagoas',
    hotels: [
      { name: 'Pousada La na Praia', city: 'Maragogi' },
    ],
  },
  {
    id: 'BA', name: 'Bahia',
    hotels: [
      { name: 'Pousada A Capela', city: 'Arembepe' },
      { name: 'Patua do Morro', city: 'Cairu' },
      { name: 'Bahia Inn', city: 'Cairu' },
    ],
  },
  {
    id: 'RJ', name: 'Rio de Janeiro',
    hotels: [
      { name: 'Pousada Mandala', city: 'Buzios' },
    ],
  },
  {
    id: 'SP', name: 'Sao Paulo',
    hotels: [
      { name: 'Paulista Flat', city: 'Sao Paulo' },
      { name: 'Hotel Pigalle', city: 'Sao Paulo' },
      { name: 'Hotel Paddock', city: 'Sao Paulo' },
      { name: 'Hotel 28', city: 'Sao Paulo' },
      { name: 'Thermas de Olimpia Resort', city: 'Olimpia' },
      { name: 'Saint Paul Hotel', city: 'Sao Jose do Rio Preto' },
      { name: 'Pousada Nefelibatas', city: 'Aguas de Lindoia' },
      { name: 'Hotel Makai', city: 'Guaruja' },
      { name: 'Chale Vale Florido', city: 'Embu-Guacu' },
      { name: 'Pousada Maritimus', city: 'Barretos' },
      { name: 'Sol Alphaville', city: 'Barueri' },
    ],
  },
  {
    id: 'RS', name: 'Rio Grande do Sul',
    hotels: [
      { name: 'Castelo Saint Andrews', city: 'Gramado' },
    ],
  },
  {
    id: 'MG', name: 'Minas Gerais',
    hotels: [
      { name: 'Ibiti Village', city: 'Lima Duarte' },
    ],
  },
  {
    id: 'MT', name: 'Mato Grosso',
    hotels: [
      { name: 'Hotel Ucayali', city: 'Sinop' },
      { name: 'Hotel Avenida Plaza', city: 'Querencia' },
      { name: 'Araguaia Hotel', city: 'Barra do Garcas' },
      { name: 'Hotel Pousada Sol do Araguaia', city: 'Barra do Garcas' },
      { name: 'Pousada Aguas Quentes', city: 'Barra do Garcas' },
    ],
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
