import { Router } from 'express';
import UserBlogs from '../models/user_blogs.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json('lists')
});

router.post('/', async (req, res) => {
  try {
    const userBlog = await UserBlogs.create(req.body);
    res.json(userBlog);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

export { router };
