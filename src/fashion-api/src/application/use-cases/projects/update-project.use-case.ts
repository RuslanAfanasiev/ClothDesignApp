import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { UpdateProjectDto } from '../../dtos/projects/update-project.dto';
import { ProjectEntity } from '../../../domain/entities/project.entity';

@Injectable()
export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const existing = await this.projectRepository.findById(id);
    if (!existing) throw new NotFoundException(`Project ${id} not found`);
    return this.projectRepository.update(id, dto);
  }
}
