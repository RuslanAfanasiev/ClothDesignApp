import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { UpdateProjectDto } from '../../dtos/projects/update-project.dto';
import { ProjectEntity } from '../../../domain/entities/project.entity';
export declare class UpdateProjectUseCase {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    execute(id: string, dto: UpdateProjectDto): Promise<ProjectEntity>;
}
