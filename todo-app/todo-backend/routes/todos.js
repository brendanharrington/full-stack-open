const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  const todoCount = await redis.getAsync('todos')
  await redis.setAsync('todos', todoCount)
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const todoCount = parseInt(await redis.getAsync('todos') || 0)
  await redis.setAsync('todos', todoCount + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()

  const count = await Todo.countDocuments({})
  await redis.setAsync('todos', count)
  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  if (typeof text === 'undefined' && typeof done === 'undefined') {
    return res.status(400).send({ error: 'No valid fields to update' })
  }

  if (typeof text !== 'undefined') req.todo.text = text
  if (typeof done !== 'undefined') req.todo.done = done

  const updatedTodo = await req.todo.save()
  res.json(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
