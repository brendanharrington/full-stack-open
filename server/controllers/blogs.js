import { Router } from 'express';

import Blog from '../models/blog.js';

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  
  if (blog) {
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(blog)
  } else {
    res.status(404).json({ error: 'not found' }).end()
  }
});

export { router };