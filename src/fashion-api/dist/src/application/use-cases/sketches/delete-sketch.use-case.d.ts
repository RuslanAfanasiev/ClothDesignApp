import { SketchRepository } from '../../../domain/repositories/sketch.repository';
export declare class DeleteSketchUseCase {
    private readonly sketchRepository;
    constructor(sketchRepository: SketchRepository);
    execute(id: string): Promise<void>;
}
