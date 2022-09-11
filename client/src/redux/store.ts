import { configureStore } from '@reduxjs/toolkit';

import todosSlice from './todos/todos-slice';

const store = configureStore({
  reducer: {
    todos: todosSlice,
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch