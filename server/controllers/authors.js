import { Router } from 'express';

import Blog from '../models/blog.js';
import { sequelize } from '../util/db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ],
      group: ['author']
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

export { router };