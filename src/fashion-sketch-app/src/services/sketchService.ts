import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';

export interface Sketch {
  id: string;
  name: string;
  projectId: string;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSketchDto {
  name: string;
  imageUrl?: string;
  notes?: string;
}

export interface UpdateSketchDto {
  name?: string;
  imageUrl?: string;
  notes?: string;
}

const sketchService = {
  fetchAll: async (projectId: string): Promise<Sketch[]> => {
    const res = await apiClient.get(API_ENDPOINTS.SKETCHES(projectId));
    return res.data?.data ?? res.data;
  },

  fetchById: async (projectId: string, id: string): Promise<Sketch> => {
    const res = await apiClient.get(API_ENDPOINTS.SKETCH(projectId, id));
    return res.data?.data ?? res.data;
  },

  create: async (projectId: string, dto: CreateSketchDto): Promise<Sketch> => {
    const res = await apiClient.post(API_ENDPOINTS.SKETCHES(projectId), dto);
    return res.data?.data ?? res.data;
  },

  update: async (projectId: string, id: string, dto: UpdateSketchDto): Promise<Sketch> => {
    const res = await apiClient.patch(API_ENDPOINTS.SKETCH(projectId, id), dto);
    return res.data?.data ?? res.data;
  },

  delete: async (projectId: string, id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.SKETCH(projectId, id));
  },
};

export default sketchService;
