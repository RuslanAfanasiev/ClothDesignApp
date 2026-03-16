import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { CreateTemplateDto } from '../../dtos/templates/create-template.dto';
import { TemplateEntity } from '../../../domain/entities/template.entity';

@Injectable()
export class CreateTemplateUseCase {
  constructor(private readonly templateRepository: TemplateRepository) {}

  execute(dto: CreateTemplateDto): Promise<TemplateEntity> {
    return this.templateRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      category: dto.category,
      isPublic: dto.isPublic ?? true,
    });
  }
}
