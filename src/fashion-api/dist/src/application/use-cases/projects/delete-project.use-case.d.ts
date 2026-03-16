import { ProjectRepository } from '../../../domain/repositories/project.repository';
export declare class DeleteProjectUseCase {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    execute(id: string): Promise<void>;
}
