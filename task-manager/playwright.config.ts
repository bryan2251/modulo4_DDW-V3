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
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ],
});