"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTemplateUseCase = void 0;
const common_1 = require("@nestjs/common");
const template_repository_1 = require("../../../domain/repositories/template.repository");
let DeleteTemplateUseCase = class DeleteTemplateUseCase {
    templateRepository;
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async execute(id) {
        const existing = await this.templateRepository.findById(id);
        if (!existing)
            throw new common_1.NotFoundException(`Template ${id} not found`);
        return this.templateRepository.delete(id);
    }
};
exports.DeleteTemplateUseCase = DeleteTemplateUseCase;
exports.DeleteTemplateUseCase = DeleteTemplateUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [template_repository_1.TemplateRepository])
], DeleteTemplateUseCase);
//# sourceMappingURL=delete-template.use-case.js.map