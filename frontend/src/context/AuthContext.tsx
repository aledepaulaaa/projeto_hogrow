import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  UserProfile,
} from '../types/auth.types';
import { authService } from '../services/auth.service';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const TOKEN_KEY = 'hogrow-access-token';

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const refreshProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const profile = await authService.getProfile();
        setUser(profile);
      }
    } catch (e) {
      console.error('Failed to refresh profile:', e);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      authService
        .getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await authService.login(credentials);
    localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    const profile = await authService.getProfile();
    setUser(profile);
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    const { tokens, user: profile } = await authService.register(credentials);
    localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      tokens: null,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, isLoading, isAuthenticated, login, register, logout, refreshProfile],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
