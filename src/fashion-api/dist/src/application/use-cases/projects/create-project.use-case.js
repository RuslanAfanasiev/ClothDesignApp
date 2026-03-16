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
exports.CreateProjectUseCase = void 0;
const common_1 = require("@nestjs/common");
const project_repository_1 = require("../../../domain/repositories/project.repository");
const project_status_vo_1 = require("../../../domain/value-objects/project-status.vo");
let CreateProjectUseCase = class CreateProjectUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(dto, ownerId) {
        return this.projectRepository.create({
            name: dto.name,
            description: dto.description,
            ownerId,
            status: dto.status ?? project_status_vo_1.ProjectStatus.DRAFT,
        });
    }
};
exports.CreateProjectUseCase = CreateProjectUseCase;
exports.CreateProjectUseCase = CreateProjectUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], CreateProjectUseCase);
//# sourceMappingURL=create-project.use-case.js.map