import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/api.config";
import { AISuggestionsResult } from "../interfaces/ai.interface";

const aiService = {
  getSuggestions: async (
    imageUrl?: string,
    context?: string,
  ): Promise<AISuggestionsResult> => {
    const res = await apiClient.post(API_ENDPOINTS.AI_SUGGESTIONS, {
      imageUrl,
      context,
    });
    return res.data?.data ?? res.data;
  },
};

export default aiService;
