import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { ProjectEntity } from '../../../domain/entities/project.entity';
export declare class ListProjectsUseCase {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    execute(ownerId: string): Promise<ProjectEntity[]>;
}
