import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    open: true,
    proxy: {
      '/api': {
        target: 'https://c741-37-214-57-96.ngrok-free.app/api/v1/app-service/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
