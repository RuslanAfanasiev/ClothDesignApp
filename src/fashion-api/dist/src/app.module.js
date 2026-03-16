"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_module_1 = require("./infrastructure/firebase/firebase.module");
const firebase_storage_service_1 = require("./infrastructure/firebase/firebase-storage.service");
const prisma_service_1 = require("./shared/prisma/prisma.service");
const project_repository_1 = require("./domain/repositories/project.repository");
const sketch_repository_1 = require("./domain/repositories/sketch.repository");
const template_repository_1 = require("./domain/repositories/template.repository");
const prisma_project_repository_1 = require("./infrastructure/persistence/prisma-project.repository");
const prisma_sketch_repository_1 = require("./infrastructure/persistence/prisma-sketch.repository");
const prisma_template_repository_1 = require("./infrastructure/persistence/prisma-template.repository");
const create_project_use_case_1 = require("./application/use-cases/projects/create-project.use-case");
const get_project_use_case_1 = require("./application/use-cases/projects/get-project.use-case");
const list_projects_use_case_1 = require("./application/use-cases/projects/list-projects.use-case");
const update_project_use_case_1 = require("./application/use-cases/projects/update-project.use-case");
const delete_project_use_case_1 = require("./application/use-cases/projects/delete-project.use-case");
const create_sketch_use_case_1 = require("./application/use-cases/sketches/create-sketch.use-case");
const get_sketch_use_case_1 = require("./application/use-cases/sketches/get-sketch.use-case");
const list_sketches_use_case_1 = require("./application/use-cases/sketches/list-sketches.use-case");
const update_sketch_use_case_1 = require("./application/use-cases/sketches/update-sketch.use-case");
const delete_sketch_use_case_1 = require("./application/use-cases/sketches/delete-sketch.use-case");
const create_template_use_case_1 = require("./application/use-cases/templates/create-template.use-case");
const get_template_use_case_1 = require("./application/use-cases/templates/get-template.use-case");
const list_templates_use_case_1 = require("./application/use-cases/templates/list-templates.use-case");
const update_template_use_case_1 = require("./application/use-cases/templates/update-template.use-case");
const delete_template_use_case_1 = require("./application/use-cases/templates/delete-template.use-case");
const projects_controller_1 = require("./presentation/controllers/projects.controller");
const sketches_controller_1 = require("./presentation/controllers/sketches.controller");
const templates_controller_1 = require("./presentation/controllers/templates.controller");
const upload_controller_1 = require("./presentation/controllers/upload.controller");
const project_owner_guard_1 = require("./presentation/guards/project-owner.guard");
const firebase_auth_guard_1 = require("./shared/guards/firebase-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            firebase_module_1.FirebaseModule,
        ],
        controllers: [
            projects_controller_1.ProjectsController,
            sketches_controller_1.SketchesController,
            templates_controller_1.TemplatesController,
            upload_controller_1.UploadController,
        ],
        providers: [
            prisma_service_1.PrismaService,
            firebase_storage_service_1.FirebaseStorageService,
            firebase_auth_guard_1.FirebaseAuthGuard,
            project_owner_guard_1.ProjectOwnerGuard,
            { provide: project_repository_1.ProjectRepository, useClass: prisma_project_repository_1.PrismaProjectRepository },
            { provide: sketch_repository_1.SketchRepository, useClass: prisma_sketch_repository_1.PrismaSketchRepository },
            { provide: template_repository_1.TemplateRepository, useClass: prisma_template_repository_1.PrismaTemplateRepository },
            create_project_use_case_1.CreateProjectUseCase,
            get_project_use_case_1.GetProjectUseCase,
            list_projects_use_case_1.ListProjectsUseCase,
            update_project_use_case_1.UpdateProjectUseCase,
            delete_project_use_case_1.DeleteProjectUseCase,
            create_sketch_use_case_1.CreateSketchUseCase,
            get_sketch_use_case_1.GetSketchUseCase,
            list_sketches_use_case_1.ListSketchesUseCase,
            update_sketch_use_case_1.UpdateSketchUseCase,
            delete_sketch_use_case_1.DeleteSketchUseCase,
            create_template_use_case_1.CreateTemplateUseCase,
            get_template_use_case_1.GetTemplateUseCase,
            list_templates_use_case_1.ListTemplatesUseCase,
            update_template_use_case_1.UpdateTemplateUseCase,
            delete_template_use_case_1.DeleteTemplateUseCase,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map