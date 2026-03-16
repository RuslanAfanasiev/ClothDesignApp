"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
class ProjectEntity {
    id;
    name;
    ownerId;
    status;
    description;
    createdAt;
    updatedAt;
    constructor(id, name, ownerId, status, description, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=project.entity.js.map