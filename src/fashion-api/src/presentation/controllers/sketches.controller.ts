import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../../shared/guards/firebase-auth.guard';
import { CreateSketchDto } from '../../application/dtos/sketches/create-sketch.dto';
import { UpdateSketchDto } from '../../application/dtos/sketches/update-sketch.dto';
import { CreateSketchUseCase } from '../../application/use-cases/sketches/create-sketch.use-case';
import { GetSketchUseCase } from '../../application/use-cases/sketches/get-sketch.use-case';
import { ListSketchesUseCase } from '../../application/use-cases/sketches/list-sketches.use-case';
import { UpdateSketchUseCase } from '../../application/use-cases/sketches/update-sketch.use-case';
import { DeleteSketchUseCase } from '../../application/use-cases/sketches/delete-sketch.use-case';

@Controller('projects/:projectId/sketches')
@UseGuards(FirebaseAuthGuard)
export class SketchesController {
  constructor(
    private readonly createSketch: CreateSketchUseCase,
    private readonly getSketch: GetSketchUseCase,
    private readonly listSketches: ListSketchesUseCase,
    private readonly updateSketch: UpdateSketchUseCase,
    private readonly deleteSketch: DeleteSketchUseCase,
  ) {}

  @Post()
  create(@Param('projectId') projectId: string, @Body() dto: CreateSketchDto) {
    return this.createSketch.execute({ ...dto, projectId });
  }

  @Get()
  findAll(@Param('projectId') projectId: string) {
    return this.listSketches.execute(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getSketch.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSketchDto) {
    return this.updateSketch.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteSketch.execute(id);
  }
}
