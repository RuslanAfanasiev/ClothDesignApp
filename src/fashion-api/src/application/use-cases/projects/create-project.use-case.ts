import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { CreateProjectDto } from '../../dtos/projects/create-project.dto';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { ProjectStatus } from '../../../domain/value-objects/project-status.vo';

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  execute(dto: CreateProjectDto, ownerId: string): Promise<ProjectEntity> {
    return this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      ownerId,
      status: dto.status ?? ProjectStatus.DRAFT,
    });
  }
}
