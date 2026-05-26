import { t, type Dictionary } from 'intlayer';

/**
 * Dicionario de traducao do Header.
 * V2: Adicionada saudacao inteligente por genero.
 */
const headerContent = {
  key: 'header',
  content: {
    changePassword: t({ pt: 'Alterar senha', en: 'Change password' }),
    profile: t({ pt: 'Perfil', en: 'Profile' }),
    logout: t({ pt: 'Sair', en: 'Logout' }),
    toggleTheme: t({ pt: 'Alternar tema', en: 'Toggle theme' }),
    welcomeMale: t({ pt: 'Bem vindo', en: 'Welcome' }),
    welcomeFemale: t({ pt: 'Bem vinda', en: 'Welcome' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default headerContent;
