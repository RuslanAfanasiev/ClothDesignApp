import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../../../domain/value-objects/project-status.vo';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
