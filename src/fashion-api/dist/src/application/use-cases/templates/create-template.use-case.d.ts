import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { CreateTemplateDto } from '../../dtos/templates/create-template.dto';
import { TemplateEntity } from '../../../domain/entities/template.entity';
export declare class CreateTemplateUseCase {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    execute(dto: CreateTemplateDto): Promise<TemplateEntity>;
}
