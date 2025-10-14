const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Brendan Harrington',
        username: 'brendan',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login button is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('Login form is shown after clicking login', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'brendan', 'password')
      await expect(page.getByText('Brendan Harrington logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'brendan', 'wrongpassword')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    const blog = {
      title: 'Blog Post by Playwright',
      author: 'Playwright',
      url: 'www.new-blog.com'
    }

    beforeEach( async ({ page }) => {
      await loginWith(page, 'brendan', 'password')
    })

    test('a new blog can be added', async ({ page }) => {
      await createBlog(page, blog)
      await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
    })
  })
})