import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ProjectRepository } from '../../domain/repositories/project.repository';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = request.params.id ?? request.params.projectId;

    const project = await this.projectRepository.findById(projectId);
    if (!project || (project as any).ownerId !== user.uid) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
