import axios from 'axios';
import { AUTH_BASE_URL } from '../config/api.config';

const authClient = axios.create({ baseURL: AUTH_BASE_URL });

export const setAuthToken = (token: string) => {
  authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete authClient.defaults.headers.common['Authorization'];
};

export default authClient;
