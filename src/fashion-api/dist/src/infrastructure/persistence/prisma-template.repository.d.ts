import { PrismaService } from '../../shared/prisma/prisma.service';
import { TemplateRepository } from '../../domain/repositories/template.repository';
import { TemplateEntity } from '../../domain/entities/template.entity';
export declare class PrismaTemplateRepository implements TemplateRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toEntity;
    findById(id: string): Promise<TemplateEntity | null>;
    findAll(): Promise<TemplateEntity[]>;
    create(data: Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TemplateEntity>;
    update(id: string, data: Partial<Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TemplateEntity>;
    delete(id: string): Promise<void>;
}
