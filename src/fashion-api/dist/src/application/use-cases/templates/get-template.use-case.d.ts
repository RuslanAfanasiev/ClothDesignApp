import { TemplateRepository } from '../../../domain/repositories/template.repository';
import { TemplateEntity } from '../../../domain/entities/template.entity';
export declare class GetTemplateUseCase {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    execute(id: string): Promise<TemplateEntity>;
}
