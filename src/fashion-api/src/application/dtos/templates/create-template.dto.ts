import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
