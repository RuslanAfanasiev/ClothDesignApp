import { SketchEntity } from '../entities/sketch.entity';

export abstract class SketchRepository {
  abstract findById(id: string): Promise<SketchEntity | null>;
  abstract findAllByProject(projectId: string): Promise<SketchEntity[]>;
  abstract create(sketch: Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<SketchEntity>;
  abstract update(id: string, data: Partial<Omit<SketchEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SketchEntity>;
  abstract delete(id: string): Promise<void>;
}
