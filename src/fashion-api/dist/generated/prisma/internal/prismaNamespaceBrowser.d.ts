import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Project: "Project";
    readonly Sketch: "Sketch";
    readonly Template: "Template";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly ownerId: "ownerId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const SketchScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly imageUrl: "imageUrl";
    readonly notes: "notes";
    readonly projectId: "projectId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SketchScalarFieldEnum = (typeof SketchScalarFieldEnum)[keyof typeof SketchScalarFieldEnum];
export declare const TemplateScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly category: "category";
    readonly isPublic: "isPublic";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
