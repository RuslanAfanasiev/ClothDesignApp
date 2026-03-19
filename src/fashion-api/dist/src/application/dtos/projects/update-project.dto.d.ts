import { ProjectStatus } from '../../../domain/enums/project-status.vo';
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: ProjectStatus;
}
