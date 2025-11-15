import jwt from 'jsonwebtoken';
import { Router } from 'express';

import { SECRET } from '../util/config.js';
import User from '../models/user.js';

const router = Router();

router.post('/', async (req, res) => {
  const { body } = req;

  const user = await User.findOne({
    where: {
      username: body.username
    }
  });

  const passwordCorrect = body.password === 'secret';

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
    user: user.username,
    name: user.name
  })
})

export { router };
