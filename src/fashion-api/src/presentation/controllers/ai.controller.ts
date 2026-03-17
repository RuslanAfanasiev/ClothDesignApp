import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../shared/guards/firebase-auth.guard';
import { GetAISuggestionsUseCase, AISuggestionsDto } from '../../application/use-cases/ai/get-suggestions.use-case';
import { IsOptional, IsString, IsUrl } from 'class-validator';

class AISuggestionsRequestDto implements AISuggestionsDto {
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  context?: string;
}

@Controller('ai')
@UseGuards(FirebaseAuthGuard)
export class AiController {
  constructor(private readonly getSuggestions: GetAISuggestionsUseCase) {}

  @Post('suggestions')
  getSuggestion(@Body() dto: AISuggestionsRequestDto) {
    return this.getSuggestions.execute(dto);
  }
}
