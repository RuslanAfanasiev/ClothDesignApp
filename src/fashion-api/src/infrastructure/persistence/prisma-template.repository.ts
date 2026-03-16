import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { TemplateRepository } from '../../domain/repositories/template.repository';
import { TemplateEntity } from '../../domain/entities/template.entity';

@Injectable()
export class PrismaTemplateRepository implements TemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): TemplateEntity {
    return new TemplateEntity(
      raw.id,
      raw.name,
      raw.isPublic,
      raw.description,
      raw.imageUrl,
      raw.category,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async findById(id: string): Promise<TemplateEntity | null> {
    const raw = await this.prisma.template.findUnique({ where: { id } });
    return raw ? this.toEntity(raw) : null;
  }

  async findAll(): Promise<TemplateEntity[]> {
    const rows = await this.prisma.template.findMany();
    return rows.map((r) => this.toEntity(r));
  }

  async create(data: Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TemplateEntity> {
    const raw = await this.prisma.template.create({ data });
    return this.toEntity(raw);
  }

  async update(id: string, data: Partial<Omit<TemplateEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TemplateEntity> {
    const raw = await this.prisma.template.update({ where: { id }, data });
    return this.toEntity(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.template.delete({ where: { id } });
  }
}
