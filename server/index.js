import { Model, DataTypes } from 'sequelize';
import express from 'express';

import { PORT } from './util/config';
import { connectToDatabase } from './util/db';

const app = express();

class Blog extends Model {};

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog',
});

Blog.sync();

app.use(express.json());

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/blogs', async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

app.get('/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete('/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  
  if (blog) {
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(blog)
  } else {
    res.status(404).json({ error: 'not found' }).end()
  }
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
