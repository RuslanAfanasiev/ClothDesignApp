import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { ProjectEntity } from '../../../domain/entities/project.entity';

@Injectable()
export class ListProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  execute(ownerId: string): Promise<ProjectEntity[]> {
    return this.projectRepository.findAllByOwner(ownerId);
  }
}
