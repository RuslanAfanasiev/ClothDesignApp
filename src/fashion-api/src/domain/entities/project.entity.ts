import { ProjectStatus } from '../value-objects/project-status.vo';

export class ProjectEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public ownerId: string,
    public status: ProjectStatus,
    public description?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
