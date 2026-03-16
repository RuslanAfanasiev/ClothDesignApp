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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../../shared/guards/firebase-auth.guard");
const current_user_decorator_1 = require("../../shared/decorators/current-user.decorator");
const project_owner_guard_1 = require("../guards/project-owner.guard");
const create_project_dto_1 = require("../../application/dtos/projects/create-project.dto");
const update_project_dto_1 = require("../../application/dtos/projects/update-project.dto");
const create_project_use_case_1 = require("../../application/use-cases/projects/create-project.use-case");
const get_project_use_case_1 = require("../../application/use-cases/projects/get-project.use-case");
const list_projects_use_case_1 = require("../../application/use-cases/projects/list-projects.use-case");
const update_project_use_case_1 = require("../../application/use-cases/projects/update-project.use-case");
const delete_project_use_case_1 = require("../../application/use-cases/projects/delete-project.use-case");
let ProjectsController = class ProjectsController {
    createProject;
    getProject;
    listProjects;
    updateProject;
    deleteProject;
    constructor(createProject, getProject, listProjects, updateProject, deleteProject) {
        this.createProject = createProject;
        this.getProject = getProject;
        this.listProjects = listProjects;
        this.updateProject = updateProject;
        this.deleteProject = deleteProject;
    }
    create(dto, user) {
        return this.createProject.execute(dto, user.uid);
    }
    findAll(user) {
        return this.listProjects.execute(user.uid);
    }
    findOne(id) {
        return this.getProject.execute(id);
    }
    update(id, dto) {
        return this.updateProject.execute(id, dto);
    }
    remove(id) {
        return this.deleteProject.execute(id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(project_owner_guard_1.ProjectOwnerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:paramtypes", [create_project_use_case_1.CreateProjectUseCase,
        get_project_use_case_1.GetProjectUseCase,
        list_projects_use_case_1.ListProjectsUseCase,
        update_project_use_case_1.UpdateProjectUseCase,
        delete_project_use_case_1.DeleteProjectUseCase])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map