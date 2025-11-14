import express from 'express';
const app = express();

import './models/index.js';
import { PORT } from './util/config.js';
import { connectToDatabase } from './util/db.js';

import { router as blogsRouter } from './controllers/blogs.js';
import { router as usersRouter } from './controllers/users.js';

app.use(express.json());

app.use('/blogs', blogsRouter);
app.use('/users', usersRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
