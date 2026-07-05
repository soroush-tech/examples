import { expect, test } from '@playwright/test'

// These assertions only pass if the msw mocks reached the loaders during the build-time
// prerender. Without the plugin the build can't even reach `api.example.test`, so the pages
// wouldn't exist.

test('SSG page prerenders the mocked product list', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Prerendered products, mocked' })).toBeVisible()
  await expect(page.getByText(/Split Keyboard/)).toBeVisible()
  await expect(page.getByText(/Trackball Mouse/)).toBeVisible()
  await expect(page.getByText(/Desk Mat/)).toBeVisible()
})

test('status page prerenders the mocked status payload', async ({ page }) => {
  await page.goto('/status')

  await expect(page.getByRole('heading', { name: 'Prerendered status, mocked' })).toBeVisible()
  await expect(page.getByText('mock-1')).toBeVisible()
})
