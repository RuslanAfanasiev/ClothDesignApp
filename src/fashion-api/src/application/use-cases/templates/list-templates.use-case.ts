import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { TemplateEntity } from '../../../domain/entities/template.entity';

@Injectable()
export class ListTemplatesUseCase {
  constructor(private readonly templateRepository: TemplateRepository) {}

  execute(): Promise<TemplateEntity[]> {
    return this.templateRepository.findAll();
  }
}
