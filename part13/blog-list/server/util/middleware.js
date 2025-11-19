import jwt from 'jsonwebtoken';

import { SECRET } from './config.js';

import Blog from '../models/blog.js'
import User from '../models/user.js';
import UserBlogs from '../models/user_blogs.js';

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      req.params.username = req.decodedToken.username;
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);

  if (req.body.username) {
    return next();
  };

  console.log(user.toJSON())

  if (!user.admin) {
    return next({ name: 'PermissionError', id: user.id });
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

  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    });
  }

  req.user = user;
  next()
};

export const userBlogFinder = async (req, res, next) => {
  req.blogId = req.params.id;

  const userBlog = await UserBlogs.findOne({
    where: {
      user_id: req.decodedToken.id,
      blog_id: req.params.id
    }
  });

  if (!userBlog) {
    return next({ name: 'UserBlogError', id: req.params.id });
  }

  req.userBlog = userBlog;
  next();
}

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

    case 'SequelizeUniqueConstraintError':
      return res.status(409).json({
        error: 'invalid username',
        details: `user with username ${err.errors[0].value} already exists!`
      });
    
    case 'PermissionError':
      return res.status(401).json({
        error: 'missing permissions',
        details: `user with id ${err.id} does not have admin permissions`
      });

    case 'UserBlogError':
      return res.status(404).json({
        error: 'user blog not found',
        details: `user with id ${req.decodedToken.id} does not have a book with id ${req.blogId} in their reading list`
      });

    case 'ListPermissionError':
      return res.status(401).json({
        error: 'cannot add blog',
        details: `user does not have permission to add a blog to that list`
      });

    default:
      console.log(err)
      return res.status(500).json({ error: 'internal server error' });
  }
}