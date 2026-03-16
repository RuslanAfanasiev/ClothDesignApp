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
exports.SketchesController = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../../shared/guards/firebase-auth.guard");
const create_sketch_dto_1 = require("../../application/dtos/sketches/create-sketch.dto");
const update_sketch_dto_1 = require("../../application/dtos/sketches/update-sketch.dto");
const create_sketch_use_case_1 = require("../../application/use-cases/sketches/create-sketch.use-case");
const get_sketch_use_case_1 = require("../../application/use-cases/sketches/get-sketch.use-case");
const list_sketches_use_case_1 = require("../../application/use-cases/sketches/list-sketches.use-case");
const update_sketch_use_case_1 = require("../../application/use-cases/sketches/update-sketch.use-case");
const delete_sketch_use_case_1 = require("../../application/use-cases/sketches/delete-sketch.use-case");
let SketchesController = class SketchesController {
    createSketch;
    getSketch;
    listSketches;
    updateSketch;
    deleteSketch;
    constructor(createSketch, getSketch, listSketches, updateSketch, deleteSketch) {
        this.createSketch = createSketch;
        this.getSketch = getSketch;
        this.listSketches = listSketches;
        this.updateSketch = updateSketch;
        this.deleteSketch = deleteSketch;
    }
    create(projectId, dto) {
        return this.createSketch.execute({ ...dto, projectId });
    }
    findAll(projectId) {
        return this.listSketches.execute(projectId);
    }
    findOne(id) {
        return this.getSketch.execute(id);
    }
    update(id, dto) {
        return this.updateSketch.execute(id, dto);
    }
    remove(id) {
        return this.deleteSketch.execute(id);
    }
};
exports.SketchesController = SketchesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_sketch_dto_1.CreateSketchDto]),
    __metadata("design:returntype", void 0)
], SketchesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SketchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SketchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sketch_dto_1.UpdateSketchDto]),
    __metadata("design:returntype", void 0)
], SketchesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SketchesController.prototype, "remove", null);
exports.SketchesController = SketchesController = __decorate([
    (0, common_1.Controller)('projects/:projectId/sketches'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:paramtypes", [create_sketch_use_case_1.CreateSketchUseCase,
        get_sketch_use_case_1.GetSketchUseCase,
        list_sketches_use_case_1.ListSketchesUseCase,
        update_sketch_use_case_1.UpdateSketchUseCase,
        delete_sketch_use_case_1.DeleteSketchUseCase])
], SketchesController);
//# sourceMappingURL=sketches.controller.js.map