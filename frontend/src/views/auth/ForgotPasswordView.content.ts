import { t, type Dictionary } from 'intlayer';

const forgotPasswordContent = {
  key: 'forgot-password-view',
  content: {
    title: t({
      en: 'Forgot Password',
      pt: 'Esqueci Minha Senha',
    }),
    subtitle: t({
      en: 'Enter your email address and we will send you a link to reset your password.',
      pt: 'Insira seu endereço de e-mail e enviaremos um link para redefinir sua senha.',
    }),
    email: t({
      en: 'Email Address',
      pt: 'Endereço de E-mail',
    }),
    submitButton: t({
      en: 'Send Reset Link',
      pt: 'Enviar Link de Redefinição',
    }),
    successMessage: t({
      en: 'If your email is registered, you will receive a reset link shortly.',
      pt: 'Se o seu e-mail estiver registrado, você receberá um link de redefinição em breve.',
    }),
    backToLogin: t({
      en: 'Back to Login',
      pt: 'Voltar ao Login',
    }),
    errorInvalid: t({
      en: 'An error occurred. Please try again.',
      pt: 'Ocorreu um erro. Tente novamente.',
    }),
  },
  schema: undefined
} satisfies Dictionary;

export default forgotPasswordContent;
