import { t, type Dictionary } from 'intlayer';

/**
 * Dicionario de traducao do Portfolio HoGrow.
 */
const portfolioContent = {
  key: 'portfolio-view',
  content: {
    title: t({ pt: 'Portfolio HoGrow', en: 'HoGrow Portfolio' }),
    subtitle: t({ pt: 'Conheca nossos parceiros em todo o Brasil', en: 'Meet our partners across Brazil' }),
    mapTab: t({ pt: 'Mapa', en: 'Map' }),
    partnersTab: t({ pt: 'Lista', en: 'List' }),
    yearsInMarket: t({ pt: '+6 anos no mercado', en: '+6 years in the market' }),
    partners: t({ pt: '+44 parceiros: hoteis, pousadas e resorts', en: '+44 partners: hotels, inns and resorts' }),
    rooms: t({ pt: '+3.000 quartos administrados pela HoGrow', en: '+3,000 rooms managed by HoGrow' }),
    clickState: t({ pt: 'Clique em um estado para ver as regiões parceiras', en: 'Click a state to see partner regions' }),
    regionalidade: t({ pt: 'Regionalidade', en: 'Regionality' }),
    close: t({ pt: 'Fechar', en: 'Close' }),
    ourPartners: t({ pt: 'Nossos parceiros', en: 'Our partners' }),
    regions: {
      norte: t({ pt: 'Norte', en: 'North' }),
      nordeste: t({ pt: 'Nordeste', en: 'Northeast' }),
      centroOeste: t({ pt: 'Centro-Oeste', en: 'Central-West' }),
      sudeste: t({ pt: 'Sudeste', en: 'Southeast' }),
      sul: t({ pt: 'Sul', en: 'South' }),
    }
  },
  schema: undefined,
} satisfies Dictionary;

export default portfolioContent;
