import axios from 'axios';
import { Alert } from 'react-native';

function processMessage(message: string | string[]) {
  if (typeof message === 'string') return message;
  return message.reduce((acc, m) => `${acc}\n${m}`);
}

const api = axios.create({
  baseURL: 'https://poshap-api-deploy.onrender.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.defaults.timeout = 30000;

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201)
      return Promise.resolve(response);
    else return Promise.reject(response);
  },

  (error) => {
    if (!error.response) {
      Alert.alert('', 'Não foi possível acessar o servidor.');
      return Promise.reject(error);
    }

    const { data } = error.response;
    const message = processMessage(data.message);
    const aletMessage =
      message === 'Unauthorized' ? 'Autenticação falhou' : message;

    Alert.alert('', aletMessage);
    return Promise.reject({ ...data, message });
  },
);

export default api;
