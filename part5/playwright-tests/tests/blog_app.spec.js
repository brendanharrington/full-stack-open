const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Brendan Harrington',
        username: 'brendanharrington',
        password: 'password'
      }
    })

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
  
  test('form is shown after clicking login button', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()

    const locator = page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    beforeEach( async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('brendanharrington')
      await page.getByLabel('Password').fill('password')
      await page.getByRole('button', { name: 'Login' }).click()
      
      const locator = page.getByText('Brendan Harrington logged in')
      await expect(locator).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('brendanharrington')
      await page.getByLabel('Password').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()
      
      const locator = page.getByText('Wrong credentials')
      await expect(locator).toBeVisible()
    })
  })
})