import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ProjectRepository } from '../../domain/repositories/project.repository';
export declare class ProjectOwnerGuard implements CanActivate {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
