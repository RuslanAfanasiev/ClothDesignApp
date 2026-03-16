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
exports.ProjectOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const project_repository_1 = require("../../domain/repositories/project.repository");
let ProjectOwnerGuard = class ProjectOwnerGuard {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const projectId = request.params.id ?? request.params.projectId;
        const project = await this.projectRepository.findById(projectId);
        if (!project || project.ownerId !== user.uid) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return true;
    }
};
exports.ProjectOwnerGuard = ProjectOwnerGuard;
exports.ProjectOwnerGuard = ProjectOwnerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectOwnerGuard);
//# sourceMappingURL=project-owner.guard.js.map