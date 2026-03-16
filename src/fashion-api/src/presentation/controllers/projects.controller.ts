import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';


import { FirebaseAuthGuard } from '../../shared/guards/firebase-auth.guard';
import { CurrentUser, AuthUser } from '../../shared/decorators/current-user.decorator';
import { ProjectOwnerGuard } from '../guards/project-owner.guard';
import { CreateProjectDto } from '../../application/dtos/projects/create-project.dto';
import { UpdateProjectDto } from '../../application/dtos/projects/update-project.dto';
import { CreateProjectUseCase } from '../../application/use-cases/projects/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/projects/get-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/projects/list-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/projects/update-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/projects/delete-project.use-case';

@Controller('projects')
@UseGuards(FirebaseAuthGuard)
export class ProjectsController {
  constructor(
    private readonly createProject: CreateProjectUseCase,
    private readonly getProject: GetProjectUseCase,
    private readonly listProjects: ListProjectsUseCase,
    private readonly updateProject: UpdateProjectUseCase,
    private readonly deleteProject: DeleteProjectUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProjectDto, @CurrentUser() user: AuthUser) {
    return this.createProject.execute(dto, user.uid);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.listProjects.execute(user.uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getProject.execute(id);
  }

  @Patch(':id')
  @UseGuards(ProjectOwnerGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.updateProject.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(ProjectOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteProject.execute(id);
  }
}
