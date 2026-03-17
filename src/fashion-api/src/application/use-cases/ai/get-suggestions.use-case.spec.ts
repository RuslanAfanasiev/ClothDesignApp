import { GetAISuggestionsUseCase } from './get-suggestions.use-case';
import { ConfigService } from '@nestjs/config';

jest.mock('@anthropic-ai/sdk', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn().mockResolvedValue({
          content: [
            {
              type: 'text',
              text: '{"suggestions":[{"category":"Culori","suggestion":"Foloseste nuante terestre pentru o paleta clasica"},{"category":"Silueta","suggestion":"Evidentiaza talia cu o centura subtire"}]}',
            },
          ],
        }),
      },
    })),
  };
});

describe('GetAISuggestionsUseCase', () => {
  let useCase: GetAISuggestionsUseCase;

  beforeEach(() => {
    const configService = {
      getOrThrow: jest.fn().mockReturnValue('test-api-key'),
    } as unknown as ConfigService;

    useCase = new GetAISuggestionsUseCase(configService);
  });

  it('should return parsed suggestions from Claude', async () => {
    const result = await useCase.execute({ context: 'Rochie de seara' });

    expect(result.suggestions).toHaveLength(2);
    expect(result.suggestions[0].category).toBe('Culori');
    expect(result.suggestions[1].category).toBe('Silueta');
  });

  it('should work with imageUrl', async () => {
    const result = await useCase.execute({
      imageUrl: 'https://example.com/sketch.png',
      context: 'Costum barbatesc',
    });

    expect(result.suggestions).toBeDefined();
    expect(Array.isArray(result.suggestions)).toBe(true);
  });
});
