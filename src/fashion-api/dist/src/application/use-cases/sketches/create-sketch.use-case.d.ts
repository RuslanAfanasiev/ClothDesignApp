import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { CreateSketchDto } from '../../dtos/sketches/create-sketch.dto';
import { SketchEntity } from '../../../domain/entities/sketch.entity';
export declare class CreateSketchUseCase {
    private readonly sketchRepository;
    constructor(sketchRepository: SketchRepository);
    execute(dto: CreateSketchDto & {
        projectId: string;
    }): Promise<SketchEntity>;
}
