import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { FirebaseStorageService } from './infrastructure/firebase/firebase-storage.service';
import { PrismaService } from './shared/prisma/prisma.service';

// Repositories
import { ProjectRepository } from './domain/repositories/project.repository';
import { SketchRepository } from './domain/repositories/sketch.repository';
import { TemplateRepository } from './domain/repositories/template.repository';
import { PrismaProjectRepository } from './infrastructure/persistence/prisma-project.repository';
import { PrismaSketchRepository } from './infrastructure/persistence/prisma-sketch.repository';
import { PrismaTemplateRepository } from './infrastructure/persistence/prisma-template.repository';

// Project use cases
import { CreateProjectUseCase } from './application/use-cases/projects/create-project.use-case';
import { GetProjectUseCase } from './application/use-cases/projects/get-project.use-case';
import { ListProjectsUseCase } from './application/use-cases/projects/list-projects.use-case';
import { UpdateProjectUseCase } from './application/use-cases/projects/update-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/projects/delete-project.use-case';

// Sketch use cases
import { CreateSketchUseCase } from './application/use-cases/sketches/create-sketch.use-case';
import { GetSketchUseCase } from './application/use-cases/sketches/get-sketch.use-case';
import { ListSketchesUseCase } from './application/use-cases/sketches/list-sketches.use-case';
import { UpdateSketchUseCase } from './application/use-cases/sketches/update-sketch.use-case';
import { DeleteSketchUseCase } from './application/use-cases/sketches/delete-sketch.use-case';

// Template use cases
import { CreateTemplateUseCase } from './application/use-cases/templates/create-template.use-case';
import { GetTemplateUseCase } from './application/use-cases/templates/get-template.use-case';
import { ListTemplatesUseCase } from './application/use-cases/templates/list-templates.use-case';
import { UpdateTemplateUseCase } from './application/use-cases/templates/update-template.use-case';
import { DeleteTemplateUseCase } from './application/use-cases/templates/delete-template.use-case';

// Controllers
import { ProjectsController } from './presentation/controllers/projects.controller';
import { SketchesController } from './presentation/controllers/sketches.controller';
import { TemplatesController } from './presentation/controllers/templates.controller';
import { UploadController } from './presentation/controllers/upload.controller';

// Guards
import { ProjectOwnerGuard } from './presentation/guards/project-owner.guard';
import { FirebaseAuthGuard } from './shared/guards/firebase-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
  ],
  controllers: [
    ProjectsController,
    SketchesController,
    TemplatesController,
    UploadController,
  ],
  providers: [
    PrismaService,
    FirebaseStorageService,
    FirebaseAuthGuard,
    ProjectOwnerGuard,

    // Repository bindings
    { provide: ProjectRepository, useClass: PrismaProjectRepository },
    { provide: SketchRepository, useClass: PrismaSketchRepository },
    { provide: TemplateRepository, useClass: PrismaTemplateRepository },

    // Project use cases
    CreateProjectUseCase,
    GetProjectUseCase,
    ListProjectsUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,

    // Sketch use cases
    CreateSketchUseCase,
    GetSketchUseCase,
    ListSketchesUseCase,
    UpdateSketchUseCase,
    DeleteSketchUseCase,

    // Template use cases
    CreateTemplateUseCase,
    GetTemplateUseCase,
    ListTemplatesUseCase,
    UpdateTemplateUseCase,
    DeleteTemplateUseCase,
  ],
})
export class AppModule {}
