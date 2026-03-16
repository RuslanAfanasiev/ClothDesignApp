import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract findById(id: string): Promise<ProjectEntity | null>;
  abstract findAllByOwner(ownerId: string): Promise<ProjectEntity[]>;
  abstract create(project: Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectEntity>;
  abstract update(id: string, data: Partial<Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProjectEntity>;
  abstract delete(id: string): Promise<void>;
}
