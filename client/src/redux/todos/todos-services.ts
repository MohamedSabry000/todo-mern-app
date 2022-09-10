import getDataFromAPI from '../../utils/getDataFromAPI';

const login = async (email: string, password: string) => {
  const data = await getDataFromAPI.post('login', { email, password });
  return data;
}

const register = async (name: string, email: string, password: string) => {
  const data = await getDataFromAPI.post('signup', { name, email, password });
  return data;
}


const todosService = {
  login,
  register,
};

export default todosService;