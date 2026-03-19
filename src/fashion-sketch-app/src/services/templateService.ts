import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import { Template, CreateTemplateDto, UpdateTemplateDto } from "../interfaces/template.interface";

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
