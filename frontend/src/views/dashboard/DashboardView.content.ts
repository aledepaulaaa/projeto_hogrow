import { t, type Dictionary } from 'intlayer';

const dashboardContent = {
  key: 'dashboard-view',
  content: {
    welcome: t({ pt: 'Bem-vindo ao HoGrow', en: 'Welcome to HoGrow' }),
    subtitle: t({ pt: 'Campanha Copa do Mundo - Gire a roleta e ganhe premios', en: 'World Cup Campaign - Spin the roulette and win prizes' }),
    playRoulette: t({ pt: 'Jogar Roleta', en: 'Play Roulette' }),
    totalSpins: t({ pt: 'Total de Giros', en: 'Total Spins' }),
    prizesWon: t({ pt: 'Premios Ganhos', en: 'Prizes Won' }),
    quickAccess: t({ pt: 'Acesso Rapido', en: 'Quick Access' }),
  },
  schema: undefined
} satisfies Dictionary;

export default dashboardContent;
