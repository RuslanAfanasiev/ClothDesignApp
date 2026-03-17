"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAISuggestionsUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
let GetAISuggestionsUseCase = class GetAISuggestionsUseCase {
    configService;
    client;
    constructor(configService) {
        this.configService = configService;
        this.client = new sdk_1.default({
            apiKey: this.configService.getOrThrow('ANTHROPIC_API_KEY'),
        });
    }
    async execute(dto) {
        const messages = [];
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
        }
        else {
            messages.push({
                role: 'user',
                content: this.buildPrompt(dto.context),
            });
        }
        const response = await this.client.messages.create({
            model: 'claude-opus-4-6',
            max_tokens: 1024,
            system: 'Esti un designer de moda expert. Analizezi schite de design vestimentar si oferi sugestii concise si practice. Raspunzi in format JSON cu o lista de sugestii, fiecare avand un camp "category" (ex: Culori, Silueta, Textile, Accesorii, Finisaje) si un camp "suggestion" cu recomandarea.',
            messages,
        });
        const text = response.content
            .filter((b) => b.type === 'text')
            .map((b) => b.text)
            .join('');
        return this.parseResponse(text);
    }
    buildPrompt(context) {
        const base = 'Analizeaza aceasta schita de design vestimentar si ofera 4-5 sugestii de imbunatatire in format JSON: {"suggestions": [{"category": "...", "suggestion": "..."}]}';
        return context ? `${base}\nContext aditional: ${context}` : base;
    }
    parseResponse(text) {
        try {
            const match = text.match(/\{[\s\S]*\}/);
            if (match) {
                return JSON.parse(match[0]);
            }
        }
        catch {
        }
        return {
            suggestions: [
                { category: 'Sugestie', suggestion: text.trim() },
            ],
        };
    }
};
exports.GetAISuggestionsUseCase = GetAISuggestionsUseCase;
exports.GetAISuggestionsUseCase = GetAISuggestionsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GetAISuggestionsUseCase);
//# sourceMappingURL=get-suggestions.use-case.js.map