import { ConfigService } from '@nestjs/config';
export interface AISuggestionsDto {
    imageUrl?: string;
    context?: string;
}
export interface AISuggestion {
    category: string;
    suggestion: string;
}
export interface AISuggestionsResult {
    suggestions: AISuggestion[];
}
export declare class GetAISuggestionsUseCase {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    execute(dto: AISuggestionsDto): Promise<AISuggestionsResult>;
    private buildPrompt;
    private parseResponse;
}
