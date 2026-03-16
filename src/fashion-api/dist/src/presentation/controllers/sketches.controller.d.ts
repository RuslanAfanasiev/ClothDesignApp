import { CreateSketchDto } from '../../application/dtos/sketches/create-sketch.dto';
import { UpdateSketchDto } from '../../application/dtos/sketches/update-sketch.dto';
import { CreateSketchUseCase } from '../../application/use-cases/sketches/create-sketch.use-case';
import { GetSketchUseCase } from '../../application/use-cases/sketches/get-sketch.use-case';
import { ListSketchesUseCase } from '../../application/use-cases/sketches/list-sketches.use-case';
import { UpdateSketchUseCase } from '../../application/use-cases/sketches/update-sketch.use-case';
import { DeleteSketchUseCase } from '../../application/use-cases/sketches/delete-sketch.use-case';
export declare class SketchesController {
    private readonly createSketch;
    private readonly getSketch;
    private readonly listSketches;
    private readonly updateSketch;
    private readonly deleteSketch;
    constructor(createSketch: CreateSketchUseCase, getSketch: GetSketchUseCase, listSketches: ListSketchesUseCase, updateSketch: UpdateSketchUseCase, deleteSketch: DeleteSketchUseCase);
    create(projectId: string, dto: CreateSketchDto): Promise<import("../../domain/entities/sketch.entity").SketchEntity>;
    findAll(projectId: string): Promise<import("../../domain/entities/sketch.entity").SketchEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/sketch.entity").SketchEntity>;
    update(id: string, dto: UpdateSketchDto): Promise<import("../../domain/entities/sketch.entity").SketchEntity>;
    remove(id: string): Promise<void>;
}
