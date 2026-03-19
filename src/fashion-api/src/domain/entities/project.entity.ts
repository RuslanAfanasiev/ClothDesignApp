import { ProjectStatus } from '../enums/project-status.vo';
import { Entity } from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  private readonly id: string;
  private name: string;
  private ownerId: string;
  private status: ProjectStatus;
  private description?: string;
  private readonly createdAt?: Date;
  private updatedAt?: Date;
}
