import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import { Project, CreateProjectDto, UpdateProjectDto } from "../interfaces/project.interface";

const projectService = {
  fetchAll: async (): Promise<Project[]> => {
    const res = await apiClient.get(API_ENDPOINTS.PROJECTS);
    return res.data?.data ?? res.data;
  },

  fetchById: async (id: string): Promise<Project> => {
    const res = await apiClient.get(API_ENDPOINTS.PROJECT(id));
    return res.data?.data ?? res.data;
  },

  create: async (dto: CreateProjectDto): Promise<Project> => {
    const res = await apiClient.post(API_ENDPOINTS.PROJECTS, dto);
    return res.data?.data ?? res.data;
  },

  update: async (id: string, dto: UpdateProjectDto): Promise<Project> => {
    const res = await apiClient.patch(API_ENDPOINTS.PROJECT(id), dto);
    return res.data?.data ?? res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PROJECT(id));
  },
};

export default projectService;
