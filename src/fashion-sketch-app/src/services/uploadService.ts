import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

const uploadService = {
  uploadImage: async (uri: string, filename: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', { uri, type: 'image/png', name: filename } as any);
    const res = await apiClient.post(API_ENDPOINTS.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data?.data?.url ?? res.data?.url;
  },
};

export default uploadService;
