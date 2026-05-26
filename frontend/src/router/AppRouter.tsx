import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../views/layouts/MainLayout';
import { LoginView } from '../views/auth/LoginView';
import { RegisterView } from '../views/auth/RegisterView';
import { ForgotPasswordView } from '../views/auth/ForgotPasswordView';
import { ResetPasswordView } from '../views/auth/ResetPasswordView';
import { RouletteView } from '../views/roulette/RouletteView';
import { ProfileView } from '../views/profile/ProfileView';
import { ProtectedRoute } from './ProtectedRoute';
import { ChatView } from '../views/chat/ChatView';
import { PortfolioView } from '../views/portfolio/PortfolioView';
import { RegulationsView } from '../views/regulations/RegulationsView';
import { ResultsView } from '../views/results/ResultsView';
import { WorldCupView } from '../views/world-cup/WorldCupView';

/**
 * Roteador principal da aplicacao.
 * Rotas publicas: login, register, forgot/reset password.
 * Rotas protegidas: dashboard, portfolio, world-cup, roulette, chat, results, profile, regulations.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas publicas */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/reset-password" element={<ResetPasswordView />} />

        {/* Rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PortfolioView />} />
          <Route path="world-cup" element={<WorldCupView />} />
          <Route path="roulette" element={<RouletteView />} />
          <Route path="chat" element={<ChatView />} />
          <Route path="results" element={<ResultsView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="regulations" element={<RegulationsView />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
