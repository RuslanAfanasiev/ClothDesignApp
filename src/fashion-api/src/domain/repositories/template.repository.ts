import { TemplateEntity } from '../entities/template.entity';

export abstract class TemplateRepository {
  abstract findById(id: string): Promise<TemplateEntity | null>;
  abstract findAll(): Promise<TemplateEntity[]>;
  abstract create(template: Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TemplateEntity>;
  abstract update(id: string, data: Partial<Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TemplateEntity>;
  abstract delete(id: string): Promise<void>;
}
