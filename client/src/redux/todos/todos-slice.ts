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
    setLogout(state) {
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: {
    // Users
    // Login
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      console.log(action.payload);
      state.user = action.payload.data.token;
      localStorage.setItem('token', action.payload.data.token);
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      console.log(action.error);
    },
    // Register
    [register.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { reset, setLogout } = todosSlice.actions;
export default todosSlice.reducer;
