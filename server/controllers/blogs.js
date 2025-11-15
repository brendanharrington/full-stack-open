import { Router } from 'express';
import { Op } from 'sequelize';

import Blog from '../models/blog.js';
import User from '../models/user.js';
import { blogFinder, errorHandler, tokenExtractor } from '../middleware.js';

const router = Router();

router.use('/:id', blogFinder);

router.get('/', async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      where.title = {
        [Op.substring]: req.query.search
      }
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
      where
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date() });
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