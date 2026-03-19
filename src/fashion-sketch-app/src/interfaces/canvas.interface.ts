import { AISuggestion } from "./ai.interface";

export type ToolType = "pen" | "shape" | "fabric" | "eraser" | "zoom";

export interface Point {
  x: number;
  y: number;
}

export interface StrokePath {
  id: string;
  points: Point[];
  color: string;
  width: number;
  tool: ToolType;
}

export interface CanvasState {
  // Active sketch key: sketchId for existing sketches, "new_<projectId>" for unsaved ones
  activeSketchKey: string | null;
  pathsBySketch: Record<string, StrokePath[]>;
  historyBySketch: Record<string, StrokePath[][]>;
  templateBySketch: Record<string, string | null>;
  activeTool: ToolType;
  activeColor: string;
  strokeWidth: number;
  zoom: number;
  isAISuggesting: boolean;
  aiSuggestions: AISuggestion[];
  aiSuggestionsLoading: boolean;
  aiSuggestionsError: string | null;
}
