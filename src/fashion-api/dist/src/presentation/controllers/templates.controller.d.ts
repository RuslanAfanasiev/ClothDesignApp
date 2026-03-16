import { CreateTemplateDto } from '../../application/dtos/templates/create-template.dto';
import { UpdateTemplateDto } from '../../application/dtos/templates/update-template.dto';
import { CreateTemplateUseCase } from '../../application/use-cases/templates/create-template.use-case';
import { GetTemplateUseCase } from '../../application/use-cases/templates/get-template.use-case';
import { ListTemplatesUseCase } from '../../application/use-cases/templates/list-templates.use-case';
import { UpdateTemplateUseCase } from '../../application/use-cases/templates/update-template.use-case';
import { DeleteTemplateUseCase } from '../../application/use-cases/templates/delete-template.use-case';
export declare class TemplatesController {
    private readonly createTemplate;
    private readonly getTemplate;
    private readonly listTemplates;
    private readonly updateTemplate;
    private readonly deleteTemplate;
    constructor(createTemplate: CreateTemplateUseCase, getTemplate: GetTemplateUseCase, listTemplates: ListTemplatesUseCase, updateTemplate: UpdateTemplateUseCase, deleteTemplate: DeleteTemplateUseCase);
    create(dto: CreateTemplateDto): Promise<import("../../domain/entities/template.entity").TemplateEntity>;
    findAll(): Promise<import("../../domain/entities/template.entity").TemplateEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/template.entity").TemplateEntity>;
    update(id: string, dto: UpdateTemplateDto): Promise<import("../../domain/entities/template.entity").TemplateEntity>;
    remove(id: string): Promise<void>;
}
