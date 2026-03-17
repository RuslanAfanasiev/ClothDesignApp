import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

const apiClient = axios.create({ baseURL: API_BASE_URL });

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;
