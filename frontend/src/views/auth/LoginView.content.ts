import { t, type Dictionary } from 'intlayer';

const loginContent = {
  key: 'login-view',
  content: {
    title: t({ pt: 'Bem-vindo de volta', en: 'Welcome back' }),
    subtitle: t({ pt: 'Entre na sua conta para continuar', en: 'Sign in to your account to continue' }),
    email: t({ pt: 'E-mail', en: 'Email' }),
    password: t({ pt: 'Senha', en: 'Password' }),
    loginButton: t({ pt: 'Entrar', en: 'Sign In' }),
    noAccount: t({ pt: 'Nao tem uma conta?', en: "Don't have an account?" }),
    registerLink: t({ pt: 'Cadastre-se', en: 'Sign Up' }),
    errorInvalid: t({ pt: 'E-mail ou senha invalidos', en: 'Invalid email or password' }),
    forgotPassword: t({ pt: 'Esqueci minha senha', en: 'Forgot my password' })
  },
  schema: undefined
} satisfies Dictionary;

export default loginContent;
