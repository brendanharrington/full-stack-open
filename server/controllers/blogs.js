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

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(req.blog)
  } else {
    res.status(404).json({ error: 'not found' }).end()
  }
});

export { router };