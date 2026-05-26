import { t, type Dictionary } from 'intlayer';

const rouletteContent = {
  key: 'roulette-view',
  content: {
    title: t({ pt: 'Roleta da Sorte', en: 'Lucky Roulette' }),
    subtitle: t({ pt: 'Toque na roleta para girar e descobrir seu premio!', en: 'Tap the roulette to spin and discover your prize!' }),
    spinButton: t({ pt: 'Girar', en: 'Spin' }),
    spinning: t({ pt: 'Girando...', en: 'Spinning...' }),
    congratulations: t({ pt: 'Parabens!', en: 'Congratulations!' }),
    youWon: t({ pt: 'Voce ganhou:', en: 'You won:' }),
    playAgain: t({ pt: 'Jogar Novamente', en: 'Play Again' }),
    prize1: t({ pt: 'Por pouco!', en: 'So close!' }),
    prize2: t({ pt: 'Caixa chocolate', en: 'Chocolate box' }),
    prize3: t({ pt: '1 ponto', en: '1 point' }),
    prize4: t({ pt: 'Quase...', en: 'Almost...' }),
    prize5: t({ pt: 'Copos Térmico', en: 'Thermal Cup' }),
    prize6: t({ pt: '2 pontos', en: '2 points' }),
    prize7: t({ pt: 'Não deu', en: 'No luck' }),
    prize8: t({ pt: 'Suporte de celular', en: 'Phone holder' }),
    prize9: t({ pt: '3 pontos', en: '3 points' }),
    prize10: t({ pt: 'Na trave!', en: 'Crossbar!' }),
    prize11: t({ pt: 'Sabonete líquido', en: 'Liquid soap' }),
    prize12: t({ pt: '4 pontos', en: '4 points' }),
    prize13: t({ pt: 'Ops...', en: 'Oops...' }),
    prize14: t({ pt: 'Necessarie', en: 'Necessaire' }),
  },
  schema: undefined
} satisfies Dictionary;

export default rouletteContent;
