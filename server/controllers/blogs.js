import { Router } from 'express';

import Blog from '../models/blog.js';
import User from '../models/user.js';
import { blogFinder, errorHandler } from '../middleware.js';

const router = Router();

router.use('/:id', blogFinder);

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne();
    const blog = await Blog.create({...req.body, userId: user.id });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res) => {
  res.json(req.blog);
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.destroy({ where: { id: req.params.id} });
    res.json(req.blog);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await Blog.update(
      { likes: req.body.likes },
      { where: { id: req.params.id }, returning: true }
    );
    await req.blog.reload();
    res.json(req.blog);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

export { router };