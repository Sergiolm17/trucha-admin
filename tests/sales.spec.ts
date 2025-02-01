import { test, expect } from '@playwright/test';

test.describe('Módulo de Ventas', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de ventas y esperar a que cargue
    await page.goto('http://localhost:5173/sales');
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');
    // Esperar a que el contenido principal esté visible
    await page.waitForSelector('main', { timeout: 10000 });
  });

  test('debe mostrar el título de la página', async ({ page }) => {
    const title = page.getByText('Lista de Ventas');
    await expect(title).toBeVisible({ timeout: 10000 });
  });

  test('debe mostrar la tabla de ventas', async ({ page }) => {
    // Verificar que la tabla existe
    const table = page.locator('table');
    await expect(table).toBeVisible({ timeout: 10000 });
    
    // Verificar que hay filas en la tabla
    const rows = await page.locator('tbody tr').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('debe poder abrir el diálogo de nueva venta', async ({ page }) => {
    // Esperar y hacer click en el botón de nueva venta
    const addButton = page.getByRole('button', { name: 'Nueva Venta' });
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();
    
    // Verificar que el diálogo está visible
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    
    // Verificar el título del diálogo
    const dialogTitle = page.getByRole('heading', { name: 'Nueva Venta' });
    await expect(dialogTitle).toBeVisible({ timeout: 10000 });
  });

  test('debe mostrar los controles de la tabla', async ({ page }) => {
    // Esperar a que la tabla esté completamente cargada
    await page.waitForSelector('table', { timeout: 10000 });
    
    // Verificar que los controles de la tabla están presentes
    await expect(page.getByRole('checkbox', { name: 'Seleccionar todo' })).toBeVisible({ timeout: 10000 });
    
    // Verificar que las columnas principales están presentes
    const headers = page.locator('th');
    await expect(headers).toHaveCount(8); // Checkbox + 6 columnas + acciones

    // Verificar los nombres de las columnas
    await expect(page.getByText('Cliente', { exact: true })).toBeVisible();
    await expect(page.getByText('Fecha', { exact: true })).toBeVisible();
    await expect(page.getByText('Sede', { exact: true })).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByText('Estado', { exact: true })).toBeVisible();
    await expect(page.getByText('Mortalidad', { exact: true })).toBeVisible();
  });

  test('debe poder crear una nueva venta correctamente', async ({ page }) => {
    // Abrir el diálogo de nueva venta
    const addButton = page.getByRole('button', { name: 'Nueva Venta' });
    await addButton.click();

    // Esperar a que el diálogo esté visible
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Llenar el formulario
    // Seleccionar cliente
    await page.getByLabel('Cliente').click();
    await page.getByRole('option', { name: 'Cliente A' }).click();

    // Seleccionar fecha
    await page.getByLabel('Fecha').fill(new Date().toISOString().split('T')[0]);

    // Seleccionar sede
    await page.getByLabel('Sede').click();
    await page.getByRole('option', { name: 'Sede A' }).click();

    // Seleccionar estado
    await page.getByLabel('Estado').click();
    await page.getByRole('option', { name: 'Pendiente' }).click();

    // Marcar mortalidad
    await page.getByLabel('Mortalidad').click();

    // Llenar detalles de la venta
    // Seleccionar talla
    const selectTrigger = page.locator('button[role="combobox"]').first();
    await selectTrigger.click();
    await page.getByRole('option', { name: 'M' }).click();

    // Ingresar cantidad
    await page.getByPlaceholder('Cantidad').fill('100');

    // Ingresar precio
    await page.getByPlaceholder('Precio').fill('25');

    // Guardar la venta
    await page.getByRole('button', { name: 'Crear venta' }).click();

    // Verificar que el diálogo se cerró
    await expect(dialog).not.toBeVisible({ timeout: 10000 });

    // Verificar que la nueva venta aparece en la tabla
    const clientCell = page.getByRole('cell', { name: 'Cliente A' });
    await expect(clientCell).toBeVisible({ timeout: 10000 });
  });
}); 