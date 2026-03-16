import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../../domain/entities/sketch.entity';
export declare class GetSketchUseCase {
    private readonly sketchRepository;
    constructor(sketchRepository: SketchRepository);
    execute(id: string): Promise<SketchEntity>;
}
