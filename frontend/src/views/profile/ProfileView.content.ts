import { t, type Dictionary } from 'intlayer';

const profileContent = {
  key: 'profile-view',
  content: {
    title: t({ pt: 'Meu Perfil', en: 'My Profile' }),
    name: t({ pt: 'Nome', en: 'Name' }),
    email: t({ pt: 'E-mail', en: 'Email' }),
    memberSince: t({ pt: 'Membro desde', en: 'Member since' }),
    editProfile: t({ pt: 'Editar Perfil', en: 'Edit Profile' }),
  },
  schema: undefined
} satisfies Dictionary;

export default profileContent;
