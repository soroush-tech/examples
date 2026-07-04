import { expect, test } from '@playwright/test'

// These assertions only pass if the msw mocks reached the server-side loader under
// `remix vite:dev`. Without the plugin the fetch can't reach `api.example.test` and the route
// renders its ErrorBoundary instead.

test('home route server-renders the mocked product list', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Server-rendered products, mocked' })).toBeVisible()
  await expect(page.getByText(/Split Keyboard/)).toBeVisible()
  await expect(page.getByText(/Trackball Mouse/)).toBeVisible()
  await expect(page.getByText(/Desk Mat/)).toBeVisible()
})

test('status route server-renders the mocked status payload', async ({ page }) => {
  await page.goto('/status')

  await expect(page.getByRole('heading', { name: 'Server-rendered status, mocked' })).toBeVisible()
  await expect(page.getByText('mock-1')).toBeVisible()
})
