import { IntlayerProvider } from 'react-intlayer';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router/AppRouter';
import { useI18nHTMLAttributes } from './hooks/useI18nHTMLAttributes';

import { HelmetProvider } from 'react-helmet-async';

import { SplashScreen } from './components/SplashScreen';

function AppContent() {
  useI18nHTMLAttributes();
  return (
    <>
      <SplashScreen />
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <IntlayerProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </IntlayerProvider>
    </HelmetProvider>
  );
}
