import { PrismaService } from '../../shared/prisma/prisma.service';
import { SketchRepository } from '../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../domain/entities/sketch.entity';
export declare class PrismaSketchRepository implements SketchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toEntity;
    findById(id: string): Promise<SketchEntity | null>;
    findAllByProject(projectId: string): Promise<SketchEntity[]>;
    create(data: Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<SketchEntity>;
    update(id: string, data: Partial<Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SketchEntity>;
    delete(id: string): Promise<void>;
}
