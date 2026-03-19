import { Entity } from 'typeorm';

@Entity('templates')
export class TemplateEntity {
  private readonly id: string;
  private name: string;
  private isPublic: boolean;
  private description?: string;
  private imageUrl?: string;
  private category?: string;
  private readonly createdAt?: Date;
  private updatedAt?: Date;
}
