import { Router } from 'express';
import UserBlogs from '../models/user_blogs.js';
import { tokenExtractor, errorHandler, userBlogFinder, userFinder } from '../util/middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  res.json('lists')
});

router.post('/', tokenExtractor, userFinder, async (req, res, next) => {
  try {
    if (req.decodedToken.id !== req.body.userId) {
      return next({ name: 'ListPermissionError' })
    }

    const userBlog = await UserBlogs.create(req.body);
    res.json(userBlog);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.put('/:id', tokenExtractor, userBlogFinder, async (req, res, next) => {
  try {
    const { read } = req.body;

    await UserBlogs.update(
      { read },
      {
        where: {
          user_id: req.decodedToken.id,
          blog_id: req.params.id
        }
      }
    );

    await req.userBlog.reload();
    res.json(req.userBlog)
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

export { router };
