import 'dotenv/config';
import { Sequelize, Model, DataTypes } from 'sequelize';
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize(process.env.DATABASE_URL);

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
    type: DataTypes.BOOLEAN,
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

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
