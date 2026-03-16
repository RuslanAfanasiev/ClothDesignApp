import { PrismaService } from '../../shared/prisma/prisma.service';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { ProjectEntity } from '../../domain/entities/project.entity';
export declare class PrismaProjectRepository implements ProjectRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toEntity;
    findById(id: string): Promise<ProjectEntity | null>;
    findAllByOwner(ownerId: string): Promise<ProjectEntity[]>;
    create(data: Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectEntity>;
    update(id: string, data: Partial<Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProjectEntity>;
    delete(id: string): Promise<void>;
}
