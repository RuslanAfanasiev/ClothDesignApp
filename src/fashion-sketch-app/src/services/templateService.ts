import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

export interface Template {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic?: boolean;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic?: boolean;
}

const templateService = {
  fetchAll: async (): Promise<Template[]> => {
    const res = await apiClient.get(API_ENDPOINTS.TEMPLATES);
    return res.data?.data ?? res.data;
  },

  fetchById: async (id: string): Promise<Template> => {
    const res = await apiClient.get(API_ENDPOINTS.TEMPLATE(id));
    return res.data?.data ?? res.data;
  },

  create: async (dto: CreateTemplateDto): Promise<Template> => {
    const res = await apiClient.post(API_ENDPOINTS.TEMPLATES, dto);
    return res.data?.data ?? res.data;
  },

  update: async (id: string, dto: UpdateTemplateDto): Promise<Template> => {
    const res = await apiClient.patch(API_ENDPOINTS.TEMPLATE(id), dto);
    return res.data?.data ?? res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TEMPLATE(id));
  },
};

export default templateService;
