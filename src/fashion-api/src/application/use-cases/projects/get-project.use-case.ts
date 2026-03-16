import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { ProjectEntity } from '../../../domain/entities/project.entity';

@Injectable()
export class GetProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }
}
