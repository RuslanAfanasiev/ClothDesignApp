"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEntity = void 0;
class TemplateEntity {
    id;
    name;
    isPublic;
    description;
    imageUrl;
    category;
    createdAt;
    updatedAt;
    constructor(id, name, isPublic, description, imageUrl, category, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.isPublic = isPublic;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TemplateEntity = TemplateEntity;
//# sourceMappingURL=template.entity.js.map