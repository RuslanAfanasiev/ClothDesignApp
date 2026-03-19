import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import aiService from "../../services/aiService";
import { normalizeError } from "../../utils/normalizeError";
import { ToolType, Point, StrokePath, CanvasState } from "../../interfaces/canvas.interface";

const initialState: CanvasState = {
  activeSketchKey: null,
  pathsBySketch: {},
  historyBySketch: {},
  templateBySketch: {},
  activeTool: "pen",
  activeColor: "#D4AF37",
  strokeWidth: 2,
  zoom: 1,
  isAISuggesting: false,
  aiSuggestions: [],
  aiSuggestionsLoading: false,
  aiSuggestionsError: null,
};

export const fetchAISuggestions = createAsyncThunk(
  "canvas/fetchAISuggestions",
  async (
    { imageUrl, context }: { imageUrl?: string; context?: string },
    { rejectWithValue },
  ) => {
    try {
      return await aiService.getSuggestions(imageUrl, context);
    } catch (err: any) {
      return rejectWithValue(
        normalizeError(err, "Failed to get AI suggestions"),
      );
    }
  },
);

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setActiveSketchKey(state, action: PayloadAction<string | null>) {
      state.activeSketchKey = action.payload;
    },
    addPath(
      state,
      action: PayloadAction<{ sketchKey: string; path: StrokePath }>,
    ) {
      const { sketchKey, path } = action.payload;
      if (!state.pathsBySketch[sketchKey]) state.pathsBySketch[sketchKey] = [];
      if (!state.historyBySketch[sketchKey])
        state.historyBySketch[sketchKey] = [];
      state.historyBySketch[sketchKey].push([
        ...state.pathsBySketch[sketchKey],
      ]);
      state.pathsBySketch[sketchKey].push(path);
    },
    updateLastPath(
      state,
      action: PayloadAction<{ sketchKey: string; point: Point }>,
    ) {
      const { sketchKey, point } = action.payload;
      const paths = state.pathsBySketch[sketchKey];
      if (paths && paths.length > 0) {
        paths[paths.length - 1].points.push(point);
      }
    },
    undo(state, action: PayloadAction<string>) {
      const sketchKey = action.payload;
      const history = state.historyBySketch[sketchKey];
      if (history && history.length > 0) {
        state.pathsBySketch[sketchKey] = history.pop()!;
      }
    },
    clearCanvas(state, action: PayloadAction<string>) {
      const sketchKey = action.payload;
      if (!state.historyBySketch[sketchKey])
        state.historyBySketch[sketchKey] = [];
      state.historyBySketch[sketchKey].push([
        ...(state.pathsBySketch[sketchKey] ?? []),
      ]);
      state.pathsBySketch[sketchKey] = [];
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
      if (!action.payload) {
        state.aiSuggestions = [];
        state.aiSuggestionsError = null;
      }
    },
    clearAISuggestions(state) {
      state.aiSuggestions = [];
      state.aiSuggestionsError = null;
    },
    setSketchTemplate(
      state,
      action: PayloadAction<{ sketchKey: string; templateUrl: string | null }>,
    ) {
      const { sketchKey, templateUrl } = action.payload;
      state.templateBySketch[sketchKey] = templateUrl;
    },
    migrateSketchKey(
      state,
      action: PayloadAction<{ fromKey: string; toKey: string }>,
    ) {
      const { fromKey, toKey } = action.payload;
      if (state.pathsBySketch[fromKey]) {
        state.pathsBySketch[toKey] = state.pathsBySketch[fromKey];
        delete state.pathsBySketch[fromKey];
      }
      if (state.templateBySketch[fromKey] !== undefined) {
        state.templateBySketch[toKey] = state.templateBySketch[fromKey];
        delete state.templateBySketch[fromKey];
      }
      state.activeSketchKey = toKey;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAISuggestions.pending, (state) => {
        state.aiSuggestionsLoading = true;
        state.aiSuggestionsError = null;
      })
      .addCase(fetchAISuggestions.fulfilled, (state, action) => {
        state.aiSuggestionsLoading = false;
        state.aiSuggestions = action.payload.suggestions;
      })
      .addCase(fetchAISuggestions.rejected, (state, action) => {
        state.aiSuggestionsLoading = false;
        state.aiSuggestionsError = action.payload as string;
      });
  },
});

export const {
  setActiveSketchKey,
  addPath,
  updateLastPath,
  undo,
  clearCanvas,
  setActiveTool,
  setActiveColor,
  setStrokeWidth,
  setZoom,
  setAISuggesting,
  clearAISuggestions,
  setSketchTemplate,
  migrateSketchKey,
} = canvasSlice.actions;

export default canvasSlice.reducer;
