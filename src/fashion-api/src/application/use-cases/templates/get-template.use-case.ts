import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { TemplateEntity } from '../../../domain/entities/template.entity';

@Injectable()
export class GetTemplateUseCase {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async execute(id: string): Promise<TemplateEntity> {
    const template = await this.templateRepository.findById(id);
    if (!template) throw new NotFoundException(`Template ${id} not found`);
    return template;
  }
}
