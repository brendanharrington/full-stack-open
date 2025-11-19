const express = require('express');
const redis = require('../redis');
const router = express.Router();

const configs = require('../util/config');

/* GET index data. */
router.get('/', async (req, res) => {
  const visitCount = parseInt(await redis.getAsync('visits') || 0) + 1;
  await redis.setAsync('visits', visitCount)
  
  res.json({ ...configs, visits: visitCount });
});

router.get('/statistics', async (req, res) => {
  const todoCount = parseInt(await redis.getAsync('todos') || 0);

  res.json({ added_todos: todoCount });
});

module.exports = router;
