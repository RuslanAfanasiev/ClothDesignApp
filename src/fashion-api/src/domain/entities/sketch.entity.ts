import { Entity } from 'typeorm';

@Entity('sketches')
export class SketchEntity {
  private readonly id: string;
  private name: string;
  private projectId: string;
  private imageUrl?: string;
  private notes?: string;
  private readonly createdAt?: Date;
  private updatedAt?: Date;
  private templateId?: string;
}
