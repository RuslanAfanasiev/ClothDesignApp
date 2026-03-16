import { ProjectStatus } from '../../../domain/value-objects/project-status.vo';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    status?: ProjectStatus;
}
