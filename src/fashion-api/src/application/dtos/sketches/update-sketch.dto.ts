import { IsOptional, IsString } from 'class-validator';

export class UpdateSketchDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
