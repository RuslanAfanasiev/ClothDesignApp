import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import { Sketch, CreateSketchDto, UpdateSketchDto } from "../interfaces/sketch.interface";

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
