import { test, expect } from '@playwright/test'
 
test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Crear una tarea
  await page.getByPlaceholder('Escribe una nueva tarea').fill('Comprar pan')
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/tasks') && response.status() === 201),
    page.getByRole('button', { name: 'Agregar Tarea' }).click()
  ]);
 
  // 3. Verla en la lista
  await expect(page.getByText('Comprar pan', { exact: false })).toBeVisible();

  // 4. Eliminirla de la lista
  await page.getByRole('button', { name: 'Eliminar' }).click()
})
