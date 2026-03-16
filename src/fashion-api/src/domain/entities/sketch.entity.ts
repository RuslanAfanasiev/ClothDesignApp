export class SketchEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public projectId: string,
    public imageUrl?: string,
    public notes?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
