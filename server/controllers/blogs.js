import { Router } from 'express';

import Blog from '../models/blog.js';

const router = Router();

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return next({ name: 'BlogIdError', id: req.params.id });
  }

  req.blog = blog;
  next();
  
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      return res.status(422).json({
        error: 'validation failed',
        details: err.errors.map(e => e.message)
      });

    case 'BlogIdError':
      return res.status(404).json({
        error: 'invalid blog id',
        details: `blog with id ${err.id} does not exist`
      });

    default:
      return res.status(500).json({ error: 'internal server error' });
  }
}

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
    const blog = await Blog.create(req.body);
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
      { where: { id: req.params.id } }
    );
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

export { router };