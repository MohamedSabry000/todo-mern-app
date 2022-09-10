import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import todosService from './todos-services';

export const login = createAsyncThunk(
  'todos/login',
  async (user: { email: string, password: string }) => {
    return await todosService.login(user.email, user.password);
  }
);

export const register = createAsyncThunk(
  'todos/register',
  async (user: {name: string, email: string, password: string }) => {
    return await todosService.register(user.name, user.email, user.password);
  }
);

const initialState = {
  user: null,
  todos: [],
  todo: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const todosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    reset(state) {
      state.user = null;
      state.todos = [];
      state.todo = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: {
    // Users
    // Login
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Register
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { reset } = todosSlice.actions;
export default todosSlice.reducer;
