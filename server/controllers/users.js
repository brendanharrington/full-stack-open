import { Router } from 'express';

import User from '../models/user.js';

const router = Router();

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
  const user = await User.findOne({
    where: { username: req.params.username }
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username }
  });
  if (user) {
    await User.update(
      { username: req.body.username },
      { where: { username: req.params.username } }
    );
    res.json(req.body.username)
  } else {
    res.status(404).end();
  }
});

export { router };
