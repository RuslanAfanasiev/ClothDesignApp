"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchEntity = void 0;
class SketchEntity {
    id;
    name;
    projectId;
    imageUrl;
    notes;
    createdAt;
    updatedAt;
    constructor(id, name, projectId, imageUrl, notes, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.projectId = projectId;
        this.imageUrl = imageUrl;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.SketchEntity = SketchEntity;
//# sourceMappingURL=sketch.entity.js.map