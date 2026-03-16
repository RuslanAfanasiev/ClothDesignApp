import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { CreateProjectDto } from '../../dtos/projects/create-project.dto';
import { ProjectEntity } from '../../../domain/entities/project.entity';
export declare class CreateProjectUseCase {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    execute(dto: CreateProjectDto, ownerId: string): Promise<ProjectEntity>;
}
