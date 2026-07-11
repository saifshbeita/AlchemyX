import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, '.', '');
  const { GEMINI_API_KEY } = env;

  const stringifiedKey = JSON.stringify(GEMINI_API_KEY);

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': stringifiedKey,
      'process.env.GEMINI_API_KEY': stringifiedKey,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
