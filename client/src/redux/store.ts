import { configureStore } from '@reduxjs/toolkit';

import todosSlice from './todos/todos-slice';

const store = configureStore({
  reducer: {
    todos: todosSlice,
  }
});

export default store;