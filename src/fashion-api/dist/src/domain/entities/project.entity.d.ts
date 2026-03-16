import { ProjectStatus } from '../value-objects/project-status.vo';
export declare class ProjectEntity {
    readonly id: string;
    name: string;
    ownerId: string;
    status: ProjectStatus;
    description?: string | undefined;
    readonly createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    constructor(id: string, name: string, ownerId: string, status: ProjectStatus, description?: string | undefined, createdAt?: Date | undefined, updatedAt?: Date | undefined);
}
