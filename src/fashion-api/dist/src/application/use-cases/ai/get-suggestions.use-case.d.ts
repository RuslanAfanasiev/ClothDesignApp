import { ConfigService } from '@nestjs/config';
import { AISuggestionsDto } from '../../dtos/ai/ai-suggestions.dto';
import { AISuggestionsResult } from '../../dtos/ai/ai-suggestions-result.interface';
export declare class GetAISuggestionsUseCase {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    execute(dto: AISuggestionsDto): Promise<AISuggestionsResult>;
    private buildPrompt;
    private parseResponse;
}
