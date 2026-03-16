import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { SketchRepository } from '../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../domain/entities/sketch.entity';

@Injectable()
export class PrismaSketchRepository implements SketchRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): SketchEntity {
    return new SketchEntity(
      raw.id,
      raw.name,
      raw.projectId,
      raw.imageUrl,
      raw.notes,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async findById(id: string): Promise<SketchEntity | null> {
    const raw = await this.prisma.sketch.findUnique({ where: { id } });
    return raw ? this.toEntity(raw) : null;
  }

  async findAllByProject(projectId: string): Promise<SketchEntity[]> {
    const rows = await this.prisma.sketch.findMany({ where: { projectId } });
    return rows.map((r) => this.toEntity(r));
  }

  async create(data: Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<SketchEntity> {
    const raw = await this.prisma.sketch.create({ data });
    return this.toEntity(raw);
  }

  async update(id: string, data: Partial<Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SketchEntity> {
    const raw = await this.prisma.sketch.update({ where: { id }, data });
    return this.toEntity(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sketch.delete({ where: { id } });
  }
}
