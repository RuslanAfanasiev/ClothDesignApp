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
exports.CreateSketchUseCase = void 0;
const common_1 = require("@nestjs/common");
const sketch_repository_1 = require("../../../domain/repositories/sketch.repository");
let CreateSketchUseCase = class CreateSketchUseCase {
    sketchRepository;
    constructor(sketchRepository) {
        this.sketchRepository = sketchRepository;
    }
    execute(dto) {
        return this.sketchRepository.create({
            name: dto.name,
            projectId: dto.projectId,
            imageUrl: dto.imageUrl,
            notes: dto.notes,
            templateId: dto.templateId,
        });
    }
};
exports.CreateSketchUseCase = CreateSketchUseCase;
exports.CreateSketchUseCase = CreateSketchUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sketch_repository_1.SketchRepository])
], CreateSketchUseCase);
//# sourceMappingURL=create-sketch.use-case.js.map