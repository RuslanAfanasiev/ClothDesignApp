import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToolType = 'pen' | 'shape' | 'fabric' | 'color' | 'zoom';

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

interface CanvasState {
  pathsByProject: Record<string, StrokePath[]>;
  historyByProject: Record<string, StrokePath[][]>;
  templateByProject: Record<string, string | null>;
  activeTool: ToolType;
  activeColor: string;
  strokeWidth: number;
  zoom: number;
  isAISuggesting: boolean;
}

const initialState: CanvasState = {
  pathsByProject: {},
  historyByProject: {},
  templateByProject: {},
  activeTool: 'pen',
  activeColor: '#D4AF37',
  strokeWidth: 2,
  zoom: 1,
  isAISuggesting: false,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addPath(state, action: PayloadAction<{ projectId: string; path: StrokePath }>) {
      const { projectId, path } = action.payload;
      if (!state.pathsByProject[projectId]) state.pathsByProject[projectId] = [];
      if (!state.historyByProject[projectId]) state.historyByProject[projectId] = [];
      state.historyByProject[projectId].push([...state.pathsByProject[projectId]]);
      state.pathsByProject[projectId].push(path);
    },
    updateLastPath(state, action: PayloadAction<{ projectId: string; point: Point }>) {
      const { projectId, point } = action.payload;
      const paths = state.pathsByProject[projectId];
      if (paths && paths.length > 0) {
        paths[paths.length - 1].points.push(point);
      }
    },
    undo(state, action: PayloadAction<string>) {
      const projectId = action.payload;
      const history = state.historyByProject[projectId];
      if (history && history.length > 0) {
        state.pathsByProject[projectId] = history.pop()!;
      }
    },
    clearCanvas(state, action: PayloadAction<string>) {
      const projectId = action.payload;
      if (!state.historyByProject[projectId]) state.historyByProject[projectId] = [];
      state.historyByProject[projectId].push([...(state.pathsByProject[projectId] ?? [])]);
      state.pathsByProject[projectId] = [];
    },
    setActiveTool(state, action: PayloadAction<ToolType>) {
      state.activeTool = action.payload;
    },
    setActiveColor(state, action: PayloadAction<string>) {
      state.activeColor = action.payload;
    },
    setStrokeWidth(state, action: PayloadAction<number>) {
      state.strokeWidth = action.payload;
    },
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = Math.min(Math.max(action.payload, 0.5), 3);
    },
    setAISuggesting(state, action: PayloadAction<boolean>) {
      state.isAISuggesting = action.payload;
    },
    setProjectTemplate(state, action: PayloadAction<{ projectId: string; templateUrl: string | null }>) {
      const { projectId, templateUrl } = action.payload;
      state.templateByProject[projectId] = templateUrl;
    },
  },
});

export const {
  addPath,
  updateLastPath,
  undo,
  clearCanvas,
  setActiveTool,
  setActiveColor,
  setStrokeWidth,
  setZoom,
  setAISuggesting,
  setProjectTemplate,
} = canvasSlice.actions;

export default canvasSlice.reducer;
