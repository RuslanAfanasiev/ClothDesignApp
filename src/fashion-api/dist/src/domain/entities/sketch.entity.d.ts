export declare class SketchEntity {
    readonly id: string;
    name: string;
    projectId: string;
    imageUrl?: string | undefined;
    notes?: string | undefined;
    readonly createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    constructor(id: string, name: string, projectId: string, imageUrl?: string | undefined, notes?: string | undefined, createdAt?: Date | undefined, updatedAt?: Date | undefined);
}
