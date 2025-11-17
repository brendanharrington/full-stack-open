import { Router } from 'express';

import User from '../models/user.js';
import Blog from '../models/blog.js';
import { isAdmin, tokenExtractor, userFinder, errorHandler } from '../util/middleware.js';
import Team from '../models/team.js';

const router = Router();

router.use('/:username', userFinder);

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

router.get('/:username', async (req, res) => {
  res.json(req.user);
});

router.put('/:username', tokenExtractor, isAdmin, async (req, res, next) => {
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
