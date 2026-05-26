import { t, type Dictionary } from 'intlayer';

const regulationsContent = {
  key: 'regulations-view',
  content: {
    title: t({ pt: 'Regulamento', en: 'Regulations' }),
    subtitle: t({ pt: 'Em breve', en: 'Coming soon' }),
    description: t({
      pt: 'O regulamento da campanha Copa do Mundo 2026 sera publicado em breve. Fique atento!',
      en: 'The World Cup 2026 campaign regulations will be published soon. Stay tuned!',
    }),
  },
  schema: undefined,
} satisfies Dictionary;

export default regulationsContent;
