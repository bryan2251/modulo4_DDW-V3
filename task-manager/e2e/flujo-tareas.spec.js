import { test, expect } from '@playwright/test';

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  await page.goto('/');

  const input = page.getByPlaceholder('Escribe una nueva tarea');
  await expect(input).toBeVisible();
  await input.fill('Comprar pan');

  // ✅ Captura la promesa SIN filtrar por res.ok()
  const responsePromise = page.waitForResponse(res => res.url().includes('/tasks') && res.request().method() === 'POST');
  
  await page.getByRole('button', { name: 'Agregar Tarea' }).click();
  
  // ✅ Espera la respuesta y evalúa el estado inmediatamente
  const response = await responsePromise;
  
  // Esto fallará rápido en CI y te dirá si fue un 500, 404, etc.
  expect(response.ok(), `El API falló con estado: ${response.status()}`).toBeTruthy();

  await expect(input).toHaveValue('');
  await expect(page.getByText('Comprar pan')).toBeVisible();
});