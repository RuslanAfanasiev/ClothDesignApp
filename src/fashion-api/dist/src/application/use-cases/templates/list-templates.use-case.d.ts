import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { TemplateEntity } from '../../../domain/entities/template.entity';
export declare class ListTemplatesUseCase {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    execute(): Promise<TemplateEntity[]>;
}
