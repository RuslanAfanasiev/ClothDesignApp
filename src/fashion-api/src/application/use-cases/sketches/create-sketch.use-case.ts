import { Injectable } from '@nestjs/common';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { CreateSketchDto } from '../../dtos/sketches/create-sketch.dto';
import { SketchEntity } from '../../../domain/entities/sketch.entity';

@Injectable()
export class CreateSketchUseCase {
  constructor(private readonly sketchRepository: SketchRepository) {}

  execute(dto: CreateSketchDto & { projectId: string }): Promise<SketchEntity> {
    return this.sketchRepository.create({
      name: dto.name,
      projectId: dto.projectId,
      imageUrl: dto.imageUrl,
      notes: dto.notes,
      templateId: dto.templateId,
    });
  }
}
