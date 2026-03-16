import { ProjectStatus } from '../../../domain/value-objects/project-status.vo';
export declare class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: ProjectStatus;
}
