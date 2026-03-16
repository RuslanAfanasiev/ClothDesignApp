import { Injectable } from '@nestjs/common';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../../domain/entities/sketch.entity';

@Injectable()
export class ListSketchesUseCase {
  constructor(private readonly sketchRepository: SketchRepository) {}

  execute(projectId: string): Promise<SketchEntity[]> {
    return this.sketchRepository.findAllByProject(projectId);
  }
}
