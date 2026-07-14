import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  webServer: [
    {
      command: 'cd ../backend && npm run dev', 
      url: 'http://localhost:3000/tasks', 
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: {
        PORT: '3000',
        DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:C0NTR4S3N4@localhost:5432/taskmanager'
      }
    },
    {
      // 2. Servidor Frontend
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: {
        // Reemplaza 'VITE_API_URL' por el nombre exacto que uses en tu frontend
        // para apuntar a la base del backend
        VITE_API_URL: 'http://localhost:3000' 
      }
    },
  ],
});