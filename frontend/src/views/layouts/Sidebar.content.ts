import { t, type Dictionary } from 'intlayer';

/**
 * Dicionario de traducao do menu lateral (Sidebar).
 * V2: Removido "settings", adicionados itens da Copa.
 */
const sidebarContent = {
  key: 'sidebar',
  content: {
    portfolio: t({ pt: 'Portfolio HoGrow', en: 'HoGrow Portfolio' }),
    worldCup: t({ pt: 'Campanha Copa do Mundo', en: 'World Cup Campaign' }),
    chat: t({ pt: 'Chat HoGrow', en: 'HoGrow Chat' }),
    results: t({ pt: 'Resultados', en: 'Results' }),
    roulette: t({ pt: 'Roleta', en: 'Roulette' }),
    profile: t({ pt: 'Perfil', en: 'Profile' }),
    regulations: t({ pt: 'Regulamento', en: 'Regulations' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default sidebarContent;
