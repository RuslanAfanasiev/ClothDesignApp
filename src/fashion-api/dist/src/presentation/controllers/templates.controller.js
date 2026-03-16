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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesController = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../../shared/guards/firebase-auth.guard");
const create_template_dto_1 = require("../../application/dtos/templates/create-template.dto");
const update_template_dto_1 = require("../../application/dtos/templates/update-template.dto");
const create_template_use_case_1 = require("../../application/use-cases/templates/create-template.use-case");
const get_template_use_case_1 = require("../../application/use-cases/templates/get-template.use-case");
const list_templates_use_case_1 = require("../../application/use-cases/templates/list-templates.use-case");
const update_template_use_case_1 = require("../../application/use-cases/templates/update-template.use-case");
const delete_template_use_case_1 = require("../../application/use-cases/templates/delete-template.use-case");
let TemplatesController = class TemplatesController {
    createTemplate;
    getTemplate;
    listTemplates;
    updateTemplate;
    deleteTemplate;
    constructor(createTemplate, getTemplate, listTemplates, updateTemplate, deleteTemplate) {
        this.createTemplate = createTemplate;
        this.getTemplate = getTemplate;
        this.listTemplates = listTemplates;
        this.updateTemplate = updateTemplate;
        this.deleteTemplate = deleteTemplate;
    }
    create(dto) {
        return this.createTemplate.execute(dto);
    }
    findAll() {
        return this.listTemplates.execute();
    }
    findOne(id) {
        return this.getTemplate.execute(id);
    }
    update(id, dto) {
        return this.updateTemplate.execute(id, dto);
    }
    remove(id) {
        return this.deleteTemplate.execute(id);
    }
};
exports.TemplatesController = TemplatesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_template_dto_1.UpdateTemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "remove", null);
exports.TemplatesController = TemplatesController = __decorate([
    (0, common_1.Controller)('templates'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:paramtypes", [create_template_use_case_1.CreateTemplateUseCase,
        get_template_use_case_1.GetTemplateUseCase,
        list_templates_use_case_1.ListTemplatesUseCase,
        update_template_use_case_1.UpdateTemplateUseCase,
        delete_template_use_case_1.DeleteTemplateUseCase])
], TemplatesController);
//# sourceMappingURL=templates.controller.js.map