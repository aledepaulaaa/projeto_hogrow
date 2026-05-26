import { intlayer } from 'vite-intlayer';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), intlayer()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3535',
        changeOrigin: true,
      },
    },
  },
});
