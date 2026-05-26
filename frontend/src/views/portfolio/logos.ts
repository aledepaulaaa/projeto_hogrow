export interface PartnerLogo {
  name: string;
  path: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  state: string;
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  // Norte
  { name: 'Tropical Executive', path: '/logo_parceiros/logo_tropical_executive.png', region: 'Norte', state: 'AM' },
  { name: 'Mural Living Hotel', path: '/logo_parceiros/logo_mural_living.png', region: 'Norte', state: 'AM' },
  { name: 'Amazon Park Hotel', path: '/logo_parceiros/logo_amazon_park_hotel.webp', region: 'Norte', state: 'PA' },
  { name: 'Hotel Coração Verde', path: '/logo_parceiros/logo_coracao_verde.webp', region: 'Norte', state: 'PA' },

  // Nordeste
  { name: '232 Concept', path: '/logo_parceiros/logo_232_concept.webp', region: 'Nordeste', state: 'PE' },
  { name: 'Rota 232', path: '/logo_parceiros/logo_rota232.png', region: 'Nordeste', state: 'PE' },
  { name: 'Pousada A Capela', path: '/logo_parceiros/logo_a_capela_pousada.png', region: 'Nordeste', state: 'BA' },
  { name: 'Hotéis Arrey', path: '/logo_parceiros/logo_arrey.svg', region: 'Nordeste', state: 'PI' },
  { name: 'Bahia Inn', path: '/logo_parceiros/logo_bahia_inn.webp', region: 'Nordeste', state: 'BA' },
  { name: 'Hotel Manaíra', path: '/logo_parceiros/logo_hotel_manaíra.png', region: 'Nordeste', state: 'PB' },
  { name: 'Pousada das Galinhas', path: '/logo_parceiros/logo_pousada_das_galinhas.webp', region: 'Nordeste', state: 'PE' },
  { name: 'Pousada Lá na Praia', path: '/logo_parceiros/logo_pousada_la_na_praia.webp', region: 'Nordeste', state: 'AL' },
  { name: 'Pousada Patuá do Morro', path: '/logo_parceiros/logo_pousada_patuá_do_morro.png', region: 'Nordeste', state: 'BA' },
  { name: 'Terrasa Solar Hotel', path: '/logo_parceiros/logo_terrasa.avif', region: 'Nordeste', state: 'CE' },

  // Centro-Oeste
  { name: 'Araguaia Hotel', path: '/logo_parceiros/logo_araguaia.webp', region: 'Centro-Oeste', state: 'MT' },
  { name: 'Hotel Avenida Plaza', path: '/logo_parceiros/logo_hotel_avenida_plaza.webp', region: 'Centro-Oeste', state: 'MT' },
  { name: 'Pousada Águas Quentes', path: '/logo_parceiros/logo_pousada_aguas_quentes.webp', region: 'Centro-Oeste', state: 'MT' },
  { name: 'Sol do Araguaia', path: '/logo_parceiros/logo_pousada_sol_do_araguaia.webp', region: 'Centro-Oeste', state: 'MT' },
  { name: 'Hotel Ucayali', path: '/logo_parceiros/logo_ucayli_hotel.webp', region: 'Centro-Oeste', state: 'MT' },

  // Sudeste
  { name: 'Chácara Vale Florido', path: '/logo_parceiros/logo_chale_vale_florido.webp', region: 'Sudeste', state: 'SP' },
  { name: 'Hotel 28', path: '/logo_parceiros/logo_hotel_28.svg', region: 'Sudeste', state: 'SP' },
  { name: 'Hotel Makai', path: '/logo_parceiros/logo_makai.jpg', region: 'Sudeste', state: 'SP' },
  { name: 'Pousada Maritimus', path: '/logo_parceiros/logo_maritimus.webp', region: 'Sudeste', state: 'SP' },
  { name: 'Hotel Paddock', path: '/logo_parceiros/logo_paddock.png', region: 'Sudeste', state: 'SP' },
  { name: 'Paulista Flat', path: '/logo_parceiros/logo_paulista.webp', region: 'Sudeste', state: 'SP' },
  { name: 'Hotel Pigalle', path: '/logo_parceiros/logo_pigalle.png', region: 'Sudeste', state: 'SP' },
  { name: 'Pousada Mandala', path: '/logo_parceiros/logo_pousada_mandala.png', region: 'Sudeste', state: 'RJ' },
  { name: 'Pousada Nefelibatas', path: '/logo_parceiros/logo_pousada_nefelibatas.png', region: 'Sudeste', state: 'SP' },
  { name: 'Saint Paul Hotel', path: '/logo_parceiros/logo_saint_paul.jpeg', region: 'Sudeste', state: 'SP' },
  { name: 'Sol Alphaville', path: '/logo_parceiros/logo_solalphaville.png', region: 'Sudeste', state: 'SP' },
  { name: 'Thermas de Olímpia', path: '/logo_parceiros/logo_thermas.webp', region: 'Sudeste', state: 'SP' },
  { name: 'Ibiti Village', path: '/logo_parceiros/logo_vibiti.png', region: 'Sudeste', state: 'MG' },

  // Sul
  { name: 'Castelo Saint Andrews', path: '/logo_parceiros/logo_saint_andrews.svg', region: 'Sul', state: 'RS' }
];