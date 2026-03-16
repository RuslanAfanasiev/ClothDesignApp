export declare class TemplateEntity {
    readonly id: string;
    name: string;
    isPublic: boolean;
    description?: string | undefined;
    imageUrl?: string | undefined;
    category?: string | undefined;
    readonly createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    constructor(id: string, name: string, isPublic: boolean, description?: string | undefined, imageUrl?: string | undefined, category?: string | undefined, createdAt?: Date | undefined, updatedAt?: Date | undefined);
}
