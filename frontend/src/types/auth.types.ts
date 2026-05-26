/** Credenciais de login */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Credenciais de registro (V2: phone + empresaName) */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone?: string;
  empresaName?: string;
}

/** Tokens JWT retornados pelo backend */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

/** Estado global de autenticacao */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  tokens: AuthTokens | null;
}

/** Perfil do usuario logado */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  empresaId?: string;
  empresaName?: string;
  points: number;
  lastPlayedAt?: string;
  createdAt: string;
  updatedAt: string;
}
