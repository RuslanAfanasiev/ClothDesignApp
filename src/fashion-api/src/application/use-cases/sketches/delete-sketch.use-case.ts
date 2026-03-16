import { Injectable, NotFoundException } from '@nestjs/common';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';

@Injectable()
export class DeleteSketchUseCase {
  constructor(private readonly sketchRepository: SketchRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.sketchRepository.findById(id);
    if (!existing) throw new NotFoundException(`Sketch ${id} not found`);
    return this.sketchRepository.delete(id);
  }
}
