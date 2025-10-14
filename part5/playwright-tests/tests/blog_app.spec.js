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
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
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
    const firstBlog = {
      title: 'First Blog Post',
      author: 'Playwright',
      url: 'www.first-blog.com'
    }

    const secondBlog = {
      title: 'Second Blog Post',
      author: 'Playwright',
      url: 'www.second-blog.com'
    }

    const thirdBlog = {
      title: 'Third Blog Post',
      author: 'Playwright',
      url: 'www.third-blog.com'
    }

    beforeEach(async ({ page }) => {
      await loginWith(page, 'brendan', 'password')
    })

    test('user can log out', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click()
      await expect(page.getByText('Logged out successfully')).toBeVisible()
    })

    test('a new blog can be added', async ({ page }) => {
      await createBlog(page, firstBlog)
      await expect(page.getByText(`${firstBlog.title} ${firstBlog.author}`)).toBeVisible()
    })

    describe('and several blogs are added', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, firstBlog)
        await createBlog(page, secondBlog)
        await createBlog(page, thirdBlog)
      })

      test('each blog exists', async ({ page }) => {
        await expect(page.getByText(`${firstBlog.title} ${firstBlog.author}`)).toBeVisible()
        await expect(page.getByText(`${secondBlog.title} ${secondBlog.author}`)).toBeVisible()
        await expect(page.getByText(`${thirdBlog.title} ${thirdBlog.author}`)).toBeVisible()
      })
      
      test('the first blog can be liked', async ({ page }) => {
        const viewButton = await page.getByRole('button', { name: 'view' }).nth(0)
        await viewButton.click()
        const likeButton = await page.getByRole('button', { name: 'like' })
        await likeButton.click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })
  })
})