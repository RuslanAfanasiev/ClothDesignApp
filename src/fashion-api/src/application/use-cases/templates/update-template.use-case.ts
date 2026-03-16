import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { UpdateTemplateDto } from '../../dtos/templates/update-template.dto';
import { TemplateEntity } from '../../../domain/entities/template.entity';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async execute(id: string, dto: UpdateTemplateDto): Promise<TemplateEntity> {
    const existing = await this.templateRepository.findById(id);
    if (!existing) throw new NotFoundException(`Template ${id} not found`);
    return this.templateRepository.update(id, dto);
  }
}
