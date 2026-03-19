export interface AISuggestion {
  category: string;
  suggestion: string;
}

export interface AISuggestionsResult {
  suggestions: AISuggestion[];
}
