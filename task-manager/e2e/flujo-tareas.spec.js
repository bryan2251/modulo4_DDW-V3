import { test, expect } from '@playwright/test';

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  await page.goto('/');

  const input = page.getByPlaceholder('Escribe una nueva tarea');
  await expect(input).toBeVisible();
  await input.fill('Comprar pan');

  // Assert that the creation request completes successfully (HTTP 2xx)
  const [response] = await Promise.all([
    page.waitForResponse(res => res.url().includes('/tasks') && res.ok()),
    page.getByRole('button', { name: 'Agregar Tarea' }).click(),
  ]);

  // Ensure the input field was cleared (confirms state update triggered)
  await expect(input).toHaveValue('');

  // Assert item presence in UI
  await expect(page.getByText('Comprar pan')).toBeVisible();
});