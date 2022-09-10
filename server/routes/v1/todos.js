const express = require('express');

const todosRouter = express.Router();

const { getTodos, createNewTodo, updateTodo, deleteTodo, findTodoById, getTodoById } = require('../../controllers/todos')
const { authenticated } = require('../../controllers/auth');

todosRouter.route('/')
  .get( authenticated, getTodos )
  .post( authenticated, createNewTodo );
todosRouter.route('/:id')
  .get( authenticated, findTodoById, getTodoById )
  .patch( authenticated, findTodoById, updateTodo )
  .delete( authenticated, findTodoById, deleteTodo );

module.exports = todosRouter;
