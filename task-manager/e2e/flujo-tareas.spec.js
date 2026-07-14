import { test, expect } from '@playwright/test';

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. NAVEGAR A LA PÁGINA (Si falta esto, Playwright está en "about:blank")
  await page.goto('/');

  // 2. Esperar e interactuar con el input
  const input = page.getByPlaceholder('Escribe una nueva tarea');
  await expect(input).toBeVisible(); // Asegura que el DOM ya cargó
  await input.fill('Comprar pan');

  // 3. Guardar la tarea
  await Promise.all([
    page.waitForResponse(res => res.url().includes('/tasks')),
    page.getByRole('button', { name: 'Agregar Tarea' }).click()
  ]);

  // 4. Verificar en la lista
  await expect(page.getByText('Comprar pan')).toBeVisible();
});