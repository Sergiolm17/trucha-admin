import { test, expect } from '@playwright/test';

// Constantes compartidas para la prueba
const TEST_URL = 'http://localhost:5173/sizes';
const TEST_TIMEOUT = 15000;
const TEST_DATA = {
  name: `T${Date.now()}`,
  commonName: `Talla Test ${Date.now()}`,
  grams: '250',
  type: 'Comercial'
};

test.describe('Módulo de Tallas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    // Esperar a que la página esté completamente cargada
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.waitForLoadState('domcontentloaded')
    ]);
    
    // Esperar a que el contenedor principal esté visible
    await page.waitForSelector('[role="main"]', { timeout: TEST_TIMEOUT });
  });

  test('debe mostrar el título de la página', async ({ page }) => {
    const title = page.getByRole('heading', { name: 'Lista de Tallas', exact: true });
    await expect(title).toBeVisible({ timeout: TEST_TIMEOUT });
  });

  test('debe mostrar la tabla de tallas con sus elementos básicos', async ({ page }) => {
    // Verificar estructura básica de la tabla
    const table = page.getByRole('table');
    await expect(table).toBeVisible({ timeout: TEST_TIMEOUT });
    
    // Verificar encabezados requeridos
    const headers = ['Nombre', 'Nombre Común', 'Gramos', 'Tipo'];
    for (const header of headers) {
      await expect(page.getByRole('columnheader', { name: header }))
        .toBeVisible({ timeout: TEST_TIMEOUT });
    }
    
    // Verificar que hay datos en la tabla
    const rows = await page.getByRole('row').count();
    expect(rows).toBeGreaterThan(1); // Al menos la fila de encabezado
  });

  test('debe poder abrir y cerrar el diálogo de nueva talla', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Nueva Talla' });
    await addButton.click();
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: TEST_TIMEOUT });
    
    const dialogTitle = page.getByRole('heading', { name: 'Nueva Talla' });
    await expect(dialogTitle).toBeVisible({ timeout: TEST_TIMEOUT });
    
    // Verificar que se puede cerrar el diálogo
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible({ timeout: TEST_TIMEOUT });
  });

  test('debe validar campos requeridos al crear una talla', async ({ page }) => {
    // Abrir diálogo
    await page.getByRole('button', { name: 'Nueva Talla' }).click();
    
    // Esperar a que el diálogo esté visible
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: TEST_TIMEOUT });
    
    // Intentar guardar sin datos
    await page.getByRole('button', { name: 'Crear Talla' }).click();
    
    // Verificar mensajes de error para cada campo requerido
    const requiredFields = ['name', 'commonName', 'grams', 'type'];
    for (const field of requiredFields) {
      const errorMessage = page.getByText('Este campo es requerido');
      await expect(errorMessage).toBeVisible({ timeout: TEST_TIMEOUT });
    }
  });

  test('debe poder crear una nueva talla exitosamente', async ({ page }) => {
    // Capturar número inicial de filas
    const initialRowCount = await page.getByRole('row').count();
    
    // Abrir diálogo y llenar formulario
    await page.getByRole('button', { name: 'Nueva Talla' }).click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: TEST_TIMEOUT });
    
    await page.getByLabel('Nombre').fill(TEST_DATA.name);
    await page.getByLabel('Nombre Común').fill(TEST_DATA.commonName);
    await page.getByLabel('Gramos').fill(TEST_DATA.grams);
    
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: TEST_DATA.type }).click();
    
    // Guardar y verificar que se cerró el diálogo
    await page.getByRole('button', { name: 'Crear Talla' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: TEST_TIMEOUT });
    
    // Verificar que la talla aparece en la tabla
    await expect(page.getByRole('cell', { name: TEST_DATA.name }))
      .toBeVisible({ timeout: TEST_TIMEOUT });
    await expect(page.getByRole('cell', { name: TEST_DATA.commonName }))
      .toBeVisible({ timeout: TEST_TIMEOUT });
    await expect(page.getByRole('cell', { name: TEST_DATA.grams }))
      .toBeVisible({ timeout: TEST_TIMEOUT });
    await expect(page.getByRole('cell', { name: TEST_DATA.type }))
      .toBeVisible({ timeout: TEST_TIMEOUT });
    
    // Verificar que se incrementó el número de filas
    const finalRowCount = await page.getByRole('row').count();
    expect(finalRowCount).toBe(initialRowCount + 1);
  });

  test('debe poder editar una talla existente', async ({ page }) => {
    // Crear una talla primero
    await test.step('Crear talla para editar', async () => {
      await page.getByRole('button', { name: 'Nueva Talla' }).click();
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: TEST_TIMEOUT });
      
      await page.getByLabel('Nombre').fill(TEST_DATA.name);
      await page.getByLabel('Nombre Común').fill(TEST_DATA.commonName);
      await page.getByLabel('Gramos').fill(TEST_DATA.grams);
      await page.getByRole('combobox').click();
      await page.getByRole('option', { name: TEST_DATA.type }).click();
      
      await page.getByRole('button', { name: 'Crear Talla' }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: TEST_TIMEOUT });
    });

    // Editar la talla creada
    await test.step('Editar talla', async () => {
      const row = page.getByRole('row', { name: new RegExp(TEST_DATA.name) });
      await row.getByRole('button', { name: 'Acciones' }).click();
      await page.getByRole('menuitem', { name: 'Editar' }).click();
      
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: TEST_TIMEOUT });

      const newData = {
        name: `${TEST_DATA.name}-mod`,
        commonName: `${TEST_DATA.commonName}-mod`,
        grams: '300',
        type: 'Grande'
      };

      await page.getByLabel('Nombre').fill(newData.name);
      await page.getByLabel('Nombre Común').fill(newData.commonName);
      await page.getByLabel('Gramos').fill(newData.grams);
      await page.getByRole('combobox').click();
      await page.getByRole('option', { name: newData.type }).click();

      await page.getByRole('button', { name: 'Guardar Cambios' }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: TEST_TIMEOUT });

      // Verificar cambios
      await expect(page.getByRole('cell', { name: newData.name }))
        .toBeVisible({ timeout: TEST_TIMEOUT });
      await expect(page.getByRole('cell', { name: newData.commonName }))
        .toBeVisible({ timeout: TEST_TIMEOUT });
      await expect(page.getByRole('cell', { name: newData.grams }))
        .toBeVisible({ timeout: TEST_TIMEOUT });
      await expect(page.getByRole('cell', { name: newData.type }))
        .toBeVisible({ timeout: TEST_TIMEOUT });
    });
  });

  test('debe poder eliminar una talla', async ({ page }) => {
    // Crear una talla para eliminar
    await test.step('Crear talla para eliminar', async () => {
      await page.getByRole('button', { name: 'Nueva Talla' }).click();
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: TEST_TIMEOUT });
      
      await page.getByLabel('Nombre').fill(TEST_DATA.name);
      await page.getByLabel('Nombre Común').fill(TEST_DATA.commonName);
      await page.getByLabel('Gramos').fill(TEST_DATA.grams);
      await page.getByRole('combobox').click();
      await page.getByRole('option', { name: TEST_DATA.type }).click();
      
      await page.getByRole('button', { name: 'Crear Talla' }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: TEST_TIMEOUT });
    });

    const initialRowCount = await page.getByRole('row').count();

    // Eliminar la talla
    await test.step('Eliminar talla', async () => {
      const row = page.getByRole('row', { name: new RegExp(TEST_DATA.name) });
      await row.getByRole('button', { name: 'Acciones' }).click();
      await page.getByRole('menuitem', { name: 'Eliminar' }).click();

      // Confirmar eliminación
      await page.getByRole('button', { name: 'Eliminar', exact: true }).click();

      // Verificar que la talla ya no existe
      await expect(page.getByRole('cell', { name: TEST_DATA.name }))
        .not.toBeVisible({ timeout: TEST_TIMEOUT });

      // Verificar que se decrementó el número de filas
      const finalRowCount = await page.getByRole('row').count();
      expect(finalRowCount).toBe(initialRowCount - 1);
    });
  });
}); 