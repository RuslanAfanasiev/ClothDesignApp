import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { ProjectEntity } from '../../../domain/entities/project.entity';
export declare class GetProjectUseCase {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    execute(id: string): Promise<ProjectEntity>;
}
