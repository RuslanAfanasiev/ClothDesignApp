import { GetAISuggestionsUseCase } from '../../application/use-cases/ai/get-suggestions.use-case';
import { AISuggestionsDto } from '../../application/dtos/ai/ai-suggestions.dto';
declare class AISuggestionsRequestDto implements AISuggestionsDto {
    imageUrl?: string;
    context?: string;
}
export declare class AiController {
    private readonly getSuggestions;
    constructor(getSuggestions: GetAISuggestionsUseCase);
    getSuggestion(dto: AISuggestionsRequestDto): Promise<import("../../application/dtos/ai/ai-suggestions-result.interface").AISuggestionsResult>;
}
export {};
