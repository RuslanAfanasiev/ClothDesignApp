import { Injectable, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from '../../../domain/repositories/template.repository';

@Injectable()
export class DeleteTemplateUseCase {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.templateRepository.findById(id);
    if (!existing) throw new NotFoundException(`Template ${id} not found`);
    return this.templateRepository.delete(id);
  }
}
