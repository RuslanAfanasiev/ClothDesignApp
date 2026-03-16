import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectStatus } from '../../domain/value-objects/project-status.vo';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): ProjectEntity {
    return new ProjectEntity(
      raw.id,
      raw.name,
      raw.ownerId,
      raw.status as ProjectStatus,
      raw.description,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const raw = await this.prisma.project.findUnique({ where: { id } });
    return raw ? this.toEntity(raw) : null;
  }

  async findAllByOwner(ownerId: string): Promise<ProjectEntity[]> {
    const rows = await this.prisma.project.findMany({ where: { ownerId } });
    return rows.map((r) => this.toEntity(r));
  }

  async create(data: Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectEntity> {
    const raw = await this.prisma.project.create({ data });
    return this.toEntity(raw);
  }

  async update(id: string, data: Partial<Omit<ProjectEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProjectEntity> {
    const raw = await this.prisma.project.update({ where: { id }, data });
    return this.toEntity(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}
