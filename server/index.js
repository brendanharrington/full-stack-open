import express from 'express';
const app = express();

import { PORT } from './util/config.js';
import { connectToDatabase } from './util/db.js';

import { router as blogsRouter } from './controllers/blogs.js';

app.use(express.json());

app.use('/api/blogs', blogsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
