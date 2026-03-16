import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../../domain/entities/sketch.entity';
export declare class ListSketchesUseCase {
    private readonly sketchRepository;
    constructor(sketchRepository: SketchRepository);
    execute(projectId: string): Promise<SketchEntity[]>;
}
