import { GetAISuggestionsUseCase, AISuggestionsDto } from '../../application/use-cases/ai/get-suggestions.use-case';
declare class AISuggestionsRequestDto implements AISuggestionsDto {
    imageUrl?: string;
    context?: string;
}
export declare class AiController {
    private readonly getSuggestions;
    constructor(getSuggestions: GetAISuggestionsUseCase);
    getSuggestion(dto: AISuggestionsRequestDto): Promise<import("../../application/use-cases/ai/get-suggestions.use-case").AISuggestionsResult>;
}
export {};
