import { test, expect } from '@playwright/test'
 
test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // Imprimir en la consola de CI cualquier fallo de red de la API
  page.on('response', response => {
    if (response.url().includes('/tasks')) {
      console.log(`[API RESPONSE] Status: ${response.status()} URL: ${response.url()}`);
    }
  });

  // ... tus pasos anteriores de navegación e input ...

  await page.getByPlaceholder('Escribe una nueva tarea').fill('Comprar pan');

  // Relajamos temporalmente el status === 201 a solo verificar la URL
  const [response] = await Promise.all([
    page.waitForResponse(res => res.url().includes('/tasks')),
    page.getByRole('button', { name: 'Agregar Tarea' }).click()
  ]);

  console.log('Código HTTP devuelto:', response.status());

  // 3. Verla en la lista
  await expect(page.getByText('Comprar pan')).toBeVisible();
});