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
import { CreateTemplateDto } from '../../application/dtos/templates/create-template.dto';
import { UpdateTemplateDto } from '../../application/dtos/templates/update-template.dto';
import { CreateTemplateUseCase } from '../../application/use-cases/templates/create-template.use-case';
import { GetTemplateUseCase } from '../../application/use-cases/templates/get-template.use-case';
import { ListTemplatesUseCase } from '../../application/use-cases/templates/list-templates.use-case';
import { UpdateTemplateUseCase } from '../../application/use-cases/templates/update-template.use-case';
import { DeleteTemplateUseCase } from '../../application/use-cases/templates/delete-template.use-case';

@Controller('templates')
@UseGuards(FirebaseAuthGuard)
export class TemplatesController {
  constructor(
    private readonly createTemplate: CreateTemplateUseCase,
    private readonly getTemplate: GetTemplateUseCase,
    private readonly listTemplates: ListTemplatesUseCase,
    private readonly updateTemplate: UpdateTemplateUseCase,
    private readonly deleteTemplate: DeleteTemplateUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTemplateDto) {
    return this.createTemplate.execute(dto);
  }

  @Get()
  findAll() {
    return this.listTemplates.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getTemplate.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    return this.updateTemplate.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteTemplate.execute(id);
  }
}
