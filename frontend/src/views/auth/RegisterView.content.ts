import { t, type Dictionary } from 'intlayer';

/**
 * Dicionario de traducao do RegisterView.
 * V2: Adicionados campos phone e agency.
 */
const registerContent = {
  key: 'register-view',
  content: {
    title: t({ pt: 'Criar conta', en: 'Create account' }),
    subtitle: t({ pt: 'Preencha os dados para se cadastrar', en: 'Fill in your details to sign up' }),
    name: t({ pt: 'Nome completo', en: 'Full name' }),
    email: t({ pt: 'E-mail corporativo', en: 'Corporate email' }),
    phone: t({ pt: 'Telefone (+55 DDD Numero)', en: 'Phone (+55 DDD Number)' }),
    empresa: t({ pt: 'Empresa', en: 'Company' }),
    password: t({ pt: 'Senha', en: 'Password' }),
    confirmPassword: t({ pt: 'Confirmar senha', en: 'Confirm password' }),
    registerButton: t({ pt: 'Cadastrar', en: 'Sign Up' }),
    hasAccount: t({ pt: 'Ja tem uma conta?', en: 'Already have an account?' }),
    loginLink: t({ pt: 'Entrar', en: 'Sign In' }),
    passwordMismatch: t({ pt: 'As senhas nao coincidem', en: 'Passwords do not match' }),
    enterEmpresa: t({ pt: 'Digite o nome da sua empresa', en: 'Type your company name' }),
  },
  schema: undefined,
} satisfies Dictionary;

export default registerContent;
