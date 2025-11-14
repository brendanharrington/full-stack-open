import Blog from './models/blog.js'

export const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return next({ name: 'BlogIdError', id: req.params.id });
  }

  req.blog = blog;
  next();
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
        details: `blog with id ${err.id} does not exist`
      });

    default:
      return res.status(500).json({ error: 'internal server error' });
  }
}