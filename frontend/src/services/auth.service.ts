import api from './api';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthTokens,
  UserProfile,
} from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await api.post<{ user: UserProfile; tokens: AuthTokens }>('/auth/login', credentials);
    return response.data.tokens;
  },

  async register(
    credentials: RegisterCredentials,
  ): Promise<{ user: UserProfile; tokens: AuthTokens }> {
    const response = await api.post<{ user: UserProfile; tokens: AuthTokens }>(
      '/auth/register',
      credentials,
    );
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await api.post<AuthTokens>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },

  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  },
};
