import { t, type Dictionary } from 'intlayer';

const resultsContent = {
  key: 'results-view',
  content: {
    title: t({ pt: 'Resultados', en: 'Results' }),
    subtitle: t({ pt: 'Resultados e ranking da sua empresa', en: 'Results and ranking of your company' }),
    position: t({ pt: 'Posição', en: 'Position' }),
    name: t({ pt: 'Nome', en: 'Name' }),
    points: t({ pt: 'Pontuação', en: 'Points' }),
    lastPlayed: t({ pt: 'Último Jogo', en: 'Last Played' }),
    noData: t({ pt: 'Nenhum resultado encontrado ainda', en: 'No results found yet' }),
    totalSpins: t({ pt: 'Total de Giros', en: 'Total Spins' }),
    prizesWon: t({ pt: 'Prêmios Ganhos', en: 'Prizes Won' }),
    myResults: t({ pt: 'Meus Resultados', en: 'My Results' }),
    generalResults: t({ pt: 'Classificação', en: 'Leaderboard' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default resultsContent;
