import { AuthUser } from '../../shared/decorators/current-user.decorator';
import { CreateProjectDto } from '../../application/dtos/projects/create-project.dto';
import { UpdateProjectDto } from '../../application/dtos/projects/update-project.dto';
import { CreateProjectUseCase } from '../../application/use-cases/projects/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/projects/get-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/projects/list-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/projects/update-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/projects/delete-project.use-case';
export declare class ProjectsController {
    private readonly createProject;
    private readonly getProject;
    private readonly listProjects;
    private readonly updateProject;
    private readonly deleteProject;
    constructor(createProject: CreateProjectUseCase, getProject: GetProjectUseCase, listProjects: ListProjectsUseCase, updateProject: UpdateProjectUseCase, deleteProject: DeleteProjectUseCase);
    create(dto: CreateProjectDto, user: AuthUser): Promise<import("../../domain/entities/project.entity").ProjectEntity>;
    findAll(user: AuthUser): Promise<import("../../domain/entities/project.entity").ProjectEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/project.entity").ProjectEntity>;
    update(id: string, dto: UpdateProjectDto): Promise<import("../../domain/entities/project.entity").ProjectEntity>;
    remove(id: string): Promise<void>;
}
