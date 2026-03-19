import { ProjectStatus } from '../../../domain/enums/project-status.vo';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    status?: ProjectStatus;
}
