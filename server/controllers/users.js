import { Router } from 'express';

import User from '../models/user.js';
import Blog from '../models/blog.js';
import { isAdmin, tokenExtractor, userFinder, errorHandler } from '../util/middleware.js';
import Team from '../models/team.js';
import UserBlogs from '../models/user_blogs.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: []
        }
      }
    ]
  });
  res.json(users);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'marked_blogs',
        attributes: { exclude: ['userId'] },
        through: { attributes: [] },
        include: [
          {
            model: User,
            attributes: ['name']
          },
        ]
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: { attributes: [] }
      }
    ]
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', userFinder, tokenExtractor, isAdmin, async (req, res, next) => {
  try {
    if (req.body.username) {
      await User.update(
        { username: req.body.username },
        { where: { username: req.params.username } }
      );
      await req.user.reload();
      res.json(req.user);
    }

    if (req.body.disabled !== undefined) {
      await User.update(
        { disabled: req.body.disabled },
        { where: { username: req.params.username } }
      );
      await req.user.reload();
      res.json(req.user);
    }
  } catch (err) {
    next(err);
  }
});



router.use(errorHandler);

export { router };
