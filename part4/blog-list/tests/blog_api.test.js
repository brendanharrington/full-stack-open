const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert.strictEqual(titles.includes('React patterns'), true)
})

test('identifier field is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  assert(blogs[0].id)
  assert.strictEqual(blogs[0]._id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A new blog entry',
    author: 'Someone',
    url: 'http://newblog.example.com',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('A new blog entry'))
})

test('if likes missing, defaults to 0', async () => {
  const newBlog = {
    title: 'Blog with no likes given',
    author: 'Author Test',
    url: 'http://nolikes.example.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('missing title or URL returns 400', async () => {
  const blogNoTitle = {
    author: 'Missing Title',
    url: 'http://missingtitle.example.com',
  }

  const blogNoUrl = {
    title: 'Missing URL',
    author: 'Missing URL',
  }

  await api.post('/api/blogs').send(blogNoTitle).expect(400)
  await api.post('/api/blogs').send(blogNoUrl).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})