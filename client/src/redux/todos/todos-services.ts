import getDataFromAPI from '../../utils/getDataFromAPI';

const login = async (email: string, password: string) => {
  const data = await getDataFromAPI.post('login', { email, password });
  return data;
}

const register = async (name: string, email: string, password: string) => {
  const data = await getDataFromAPI.post('signup', { name, email, password });
  return data;
}

const getTodos = async () => {
  const data = await getDataFromAPI.get('todos');
  return data;
}

const createTodo = async (title: string, description: string, priority: string, status: string, startDate: string, endDate: string) => {
  const data = await getDataFromAPI.post('todos', { title, description, priority, status, startDate, endDate });
  return data;
}

const updateTodo = async (_id: string, title: string, description: string, priority: string, status: string, startDate: string, endDate: string) => {
  const data = await getDataFromAPI.put(`todos/${_id}`, { title, description, priority, status, startDate, endDate });
  return data;
}


const todosService = {
  login,
  register,
  getTodos,
  createTodo,
  updateTodo,
};

export default todosService;