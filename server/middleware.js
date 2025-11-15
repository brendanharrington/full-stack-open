import jwt from 'jsonwebtoken';

import { SECRET } from './util/config.js';

import Blog from './models/blog.js'
import User from './models/user.js';

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
}

export const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return next({ name: 'BlogIdError', id: req.params.id });
  }

  req.blog = blog;
  next();
};

export const userFinder = async (req, res, next) => {
  const user = await User.findOne({
    where: { username: req.params.username }
  });

  if (!user) {
    return next({ name: 'UsernameError', username: req.params.username });
  }

  req.user = user;
  next()
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      return res.status(422).json({
        error: 'validation failed',
        details: err.errors.map(e => e.message)
      });

    case 'BlogIdError':
      return res.status(404).json({
        error: 'invalid blog id',
        details: `blog with id '${err.id}' does not exist`
      });

    case 'UsernameError':
      return res.status(404).json({
        error: 'invalid username',
        details: `user with username '${err.username}' does not exist`
      });

    default:
      console.log(err)
      return res.status(500).json({ error: 'internal server error' });
  }
}