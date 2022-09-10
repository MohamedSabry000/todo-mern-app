const Todo = require('../models/Todo');
const { catchAsync } = require('../utils/utils');

module.exports = {
  findTodoById: async (req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (todo === null) {
        return next({
            status: 'failed',
            message: 'not found'
        })
    }
    req.todo = todo;
    next();
  },
  getTodoById: async (req, res) => {
    res.json({
      status: 'success',
      data: req.todo,
    });
  },
  getTodos: catchAsync(async (req, res) => {
    const todos = await Todo.find({ user: req.userId });
    res.json({ status: 'success', todos });
  }),
  createNewTodo: catchAsync(async (req, res) => {
    const todo = await Todo.create(req.body);
    res.json({
        status: 'success',
        data: todo
    });
  }),
  updateTodo: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      res.status(404).json();
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
};
