import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project.repository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.projectRepository.findById(id);
    if (!existing) throw new NotFoundException(`Project ${id} not found`);
    return this.projectRepository.delete(id);
  }
}
