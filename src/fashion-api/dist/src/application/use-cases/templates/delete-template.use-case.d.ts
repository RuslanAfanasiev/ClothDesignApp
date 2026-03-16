import { TemplateRepository } from '../../../domain/repositories/template.repository';
export declare class DeleteTemplateUseCase {
    private readonly templateRepository;
    constructor(templateRepository: TemplateRepository);
    execute(id: string): Promise<void>;
}
