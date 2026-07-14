import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ... tu configuración actual ...
  webServer: [
    {
      command: 'npm run dev',
      cwd: '../backend',
      url: 'http://localhost:3000', // Reemplaza por el puerto donde escucha tu backend
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run dev', // O 'npm run preview' si compilas el frontend
      cwd: '.',
      url: 'http://localhost:5173', // Reemplaza por la URL de tu frontend (e.g. Vite/Next/React)
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    }
  ],
  use: {
    baseURL: 'http://localhost:5173', // La URL base que usa tu test
  },
});