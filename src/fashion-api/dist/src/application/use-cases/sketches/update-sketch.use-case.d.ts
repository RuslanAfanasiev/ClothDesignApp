import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { UpdateSketchDto } from '../../dtos/sketches/update-sketch.dto';
import { SketchEntity } from '../../../domain/entities/sketch.entity';
export declare class UpdateSketchUseCase {
    private readonly sketchRepository;
    constructor(sketchRepository: SketchRepository);
    execute(id: string, dto: UpdateSketchDto): Promise<SketchEntity>;
}
