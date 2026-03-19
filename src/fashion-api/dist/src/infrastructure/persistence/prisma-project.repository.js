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
exports.PrismaProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const project_entity_1 = require("../../domain/entities/project.entity");
let PrismaProjectRepository = class PrismaProjectRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toEntity(raw) {
        return Object.assign(new project_entity_1.ProjectEntity(), {
            id: raw.id,
            name: raw.name,
            ownerId: raw.ownerId,
            status: raw.status,
            description: raw.description,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
    async findById(id) {
        const raw = await this.prisma.project.findUnique({ where: { id } });
        return raw ? this.toEntity(raw) : null;
    }
    async findAllByOwner(ownerId) {
        const rows = await this.prisma.project.findMany({ where: { ownerId } });
        return rows.map((r) => this.toEntity(r));
    }
    async create(data) {
        const raw = await this.prisma.project.create({ data: data });
        return this.toEntity(raw);
    }
    async update(id, data) {
        const raw = await this.prisma.project.update({ where: { id }, data: data });
        return this.toEntity(raw);
    }
    async delete(id) {
        await this.prisma.project.delete({ where: { id } });
    }
};
exports.PrismaProjectRepository = PrismaProjectRepository;
exports.PrismaProjectRepository = PrismaProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProjectRepository);
//# sourceMappingURL=prisma-project.repository.js.map