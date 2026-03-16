import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { UpdateTemplateDto } from '../../dtos/templates/update-template.dto';
import { TemplateEntity } from '../../../domain/entities/template.entity';
export declare class UpdateTemplateUseCase {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    execute(id: string, dto: UpdateTemplateDto): Promise<TemplateEntity>;
}
