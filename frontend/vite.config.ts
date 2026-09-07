/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  test: {
    // Нужно, чтобы `import css from './tokens.css?raw'` в theme.test.ts
    // получал реальное содержимое файла, а не заглушку.
    css: true,
  },
});
