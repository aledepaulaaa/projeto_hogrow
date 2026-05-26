import { t, type Dictionary } from 'intlayer';

const apiErrorsContent = {
  key: 'api-errors',
  content: {
    '400': t({
      en: 'Invalid request. Please check the data submitted.',
      pt: 'Requisição inválida. Verifique os dados enviados.',
    }),
    '401': t({
      en: 'Incorrect email or password. Please try again.',
      pt: 'E-mail ou senha incorretos. Tente novamente.',
    }),
    '403': t({
      en: 'Access denied. You do not have permission to perform this action.',
      pt: 'Acesso negado. Você não tem permissão para realizar esta ação.',
    }),
    '404': t({
      en: 'Resource not found.',
      pt: 'Recurso não encontrado.',
    }),
    '500': t({
      en: 'An internal server error occurred. Please try again later.',
      pt: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
    }),
    network: t({
      en: 'Network error. Please check your internet connection.',
      pt: 'Erro de conexão. Verifique sua internet.',
    }),
    default: t({
      en: 'An unexpected error occurred. Please try again.',
      pt: 'Ocorreu um erro inesperado. Tente novamente.',
    }),
    passwordMismatch: t({
      en: 'Passwords do not match.',
      pt: 'As senhas não coincidem.',
    }),
    emailExists: t({
      en: 'This email is already registered.',
      pt: 'Este e-mail já está registrado.',
    }),
  },
  schema: undefined
} satisfies Dictionary;

export default apiErrorsContent;
