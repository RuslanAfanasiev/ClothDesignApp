import { Injectable, NotFoundException } from '@nestjs/common';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../../domain/entities/sketch.entity';

@Injectable()
export class GetSketchUseCase {
  constructor(private readonly sketchRepository: SketchRepository) {}

  async execute(id: string): Promise<SketchEntity> {
    const sketch = await this.sketchRepository.findById(id);
    if (!sketch) throw new NotFoundException(`Sketch ${id} not found`);
    return sketch;
  }
}
