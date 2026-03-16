export class TemplateEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public isPublic: boolean,
    public description?: string,
    public imageUrl?: string,
    public category?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
