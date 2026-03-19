export type ProjectStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';

export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  sketchCount?: number;
  previewUrl?: string;
}

export interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}
