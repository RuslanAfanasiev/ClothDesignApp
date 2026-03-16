import { Injectable, NotFoundException } from '@nestjs/common';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { UpdateSketchDto } from '../../dtos/sketches/update-sketch.dto';
import { SketchEntity } from '../../../domain/entities/sketch.entity';

@Injectable()
export class UpdateSketchUseCase {
  constructor(private readonly sketchRepository: SketchRepository) {}

  async execute(id: string, dto: UpdateSketchDto): Promise<SketchEntity> {
    const existing = await this.sketchRepository.findById(id);
    if (!existing) throw new NotFoundException(`Sketch ${id} not found`);
    return this.sketchRepository.update(id, dto);
  }
}
