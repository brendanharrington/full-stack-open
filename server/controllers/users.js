import { Router } from 'express';

import User from '../models/user.js';
import { userFinder, errorHandler } from '../middleware.js';

const router = Router();

router.use('/:username', userFinder);

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get('/:username', async (req, res) => {
  res.json(req.user);
});

router.put('/:username', async (req, res, next) => {
  try {
    await User.update(
      { username: req.body.username },
      { where: { username: req.params.username } }
    );
    await req.user.reload();
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

export { router };
