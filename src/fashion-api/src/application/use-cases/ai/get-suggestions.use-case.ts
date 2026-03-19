import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { AISuggestionsDto } from '../../dtos/ai/ai-suggestions.dto';
import { AISuggestion } from '../../dtos/ai/ai-suggestion.interface';
import { AISuggestionsResult } from '../../dtos/ai/ai-suggestions-result.interface';

@Injectable()
export class GetAISuggestionsUseCase {
  private readonly client: Anthropic;

  constructor(private readonly configService: ConfigService) {
    this.client = new Anthropic({
      apiKey: this.configService.getOrThrow<string>('ANTHROPIC_API_KEY'),
    });
  }

  async execute(dto: AISuggestionsDto): Promise<AISuggestionsResult> {
    const messages: Anthropic.MessageParam[] = [];

    if (dto.imageUrl) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'url', url: dto.imageUrl },
          },
          {
            type: 'text',
            text: this.buildPrompt(dto.context),
          },
        ],
      });
    } else {
      messages.push({
        role: 'user',
        content: this.buildPrompt(dto.context),
      });
    }

    const response = await this.client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system:
        'Esti un designer de moda expert. Analizezi schite de design vestimentar si oferi sugestii concise si practice. Raspunzi in format JSON cu o lista de sugestii, fiecare avand un camp "category" (ex: Culori, Silueta, Textile, Accesorii, Finisaje) si un camp "suggestion" cu recomandarea.',
      messages,
    });

    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as Anthropic.TextBlock).text)
      .join('');

    return this.parseResponse(text);
  }

  private buildPrompt(context?: string): string {
    const base =
      'Analizeaza aceasta schita de design vestimentar si ofera 4-5 sugestii de imbunatatire in format JSON: {"suggestions": [{"category": "...", "suggestion": "..."}]}';
    return context ? `${base}\nContext aditional: ${context}` : base;
  }

  private parseResponse(text: string): AISuggestionsResult {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]) as AISuggestionsResult;
      }
    } catch {
      // fallback below
    }

    return {
      suggestions: [
        { category: 'Sugestie', suggestion: text.trim() },
      ],
    };
  }
}
