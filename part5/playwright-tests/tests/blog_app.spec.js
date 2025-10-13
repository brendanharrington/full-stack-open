const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login button is shown', async ({ page }) => {
    const locator = page.getByRole('button', { name: 'Login' })
    await expect(locator).toBeVisible()
  })

  test('Login form is shown after clicking login', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()

    const locator = page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
  })
})