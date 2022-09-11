import { BASE_URL } from '../../utils/getDataFromAPI'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, User } from '../../@types/types';

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

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    return await todosService.getTodos()
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: { title: string, description: string, priority: string, status: string, startDate: string, endDate: string }) => {
    return await todosService.createTodo(todo.title, todo.description, todo.priority, todo.status, todo.startDate, todo.endDate);
  }
);

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async (todo: { _id: string, title: string, description: string, priority: string, status: string, startDate: string, endDate: string }) => {
    return await todosService.updateTodo(todo._id, todo.title, todo.description, todo.priority, todo.status, todo.startDate, todo.endDate);
  }
);

const initialState = {
  todos: [] as Todo[],
  user: {} as User | null,
  todo: {} as Todo | null,
  formState: "new",
  isLoading: false as boolean,
  isSuccess: false as boolean,
  isError: false as boolean,
};

const todosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    reset(state) {
      state.user = null;
      state.todos = [];
      state.todo = null;
      state.formState = "new"
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setLogout(state) {
      state.user = null;
      localStorage.removeItem('token');
      state.todos = [];
      state.todo = null;
      state.formState = "new"
    },
    resetFormState: (state) => {
      state.formState = "new"
      state.todo = null
    },
    updateTodo: (state, action) => {
      state.todo = action.payload
      state.formState = "edit"
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
    // Todos
    // Get Todos
    [getTodos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;

      if(action.payload.data.status === 'success'){
        state.todos = action.payload.data.todos;
      }else{
        state.isLoading = false;
        state.isError = true;
      }
    },
    [getTodos.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Create Todo
    [createTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTodo.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if(action.payload.data.status === 'success'){
        console.log(action.payload.data)
        state.todos = [...state.todos, action.payload.data.data];
      }else{
        state.isLoading = false;
        state.isError = true;
      }
    },
    [createTodo.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Update Todo
    [editTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editTodo.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if(action.payload.data.status === 'success'){
        const index = state.todos.findIndex((todo) => todo._id === action.payload.data.data._id);
        state.todos[index] = action.payload.data.data;
      }else{
        state.isLoading = false;
        state.isError = true;
      }
    },
    [editTodo.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { reset, setLogout, resetFormState, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
