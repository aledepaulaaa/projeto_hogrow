import { t, type Dictionary } from 'intlayer';

const resetPasswordContent = {
  key: 'reset-password-view',
  content: {
    title: t({
      en: 'Reset Password',
      pt: 'Redefinir Senha',
    }),
    subtitle: t({
      en: 'Create a new, strong password.',
      pt: 'Crie uma nova senha forte.',
    }),
    newPassword: t({
      en: 'New Password',
      pt: 'Nova Senha',
    }),
    confirmNewPassword: t({
      en: 'Confirm New Password',
      pt: 'Confirmar Nova Senha',
    }),
    submitButton: t({
      en: 'Reset Password',
      pt: 'Redefinir Senha',
    }),
    successMessage: t({
      en: 'Your password has been successfully reset! You can now log in.',
      pt: 'Sua senha foi redefinida com sucesso! Você já pode fazer login.',
    }),
    passwordMismatch: t({
      en: 'Passwords do not match.',
      pt: 'As senhas não coincidem.',
    }),
    errorInvalid: t({
      en: 'The reset token is invalid or has expired.',
      pt: 'O token de redefinição é inválido ou expirou.',
    }),
    goToLogin: t({
      en: 'Go to Login',
      pt: 'Ir para o Login',
    }),
  },
  schema: undefined
} satisfies Dictionary;

export default resetPasswordContent;
