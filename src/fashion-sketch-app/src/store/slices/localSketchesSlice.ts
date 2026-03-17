import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sketch } from '../../services/sketchService';

export interface LocalSketch extends Sketch {
  isLocal: true;
}

interface LocalSketchesState {
  itemsByProject: Record<string, LocalSketch[]>;
}

const initialState: LocalSketchesState = {
  itemsByProject: {},
};

const localSketchesSlice = createSlice({
  name: 'localSketches',
  initialState,
  reducers: {
    saveLocalSketch(state, action: PayloadAction<LocalSketch>) {
      const { projectId } = action.payload;
      if (!state.itemsByProject[projectId]) state.itemsByProject[projectId] = [];
      state.itemsByProject[projectId].push(action.payload);
    },
    updateLocalSketch(
      state,
      action: PayloadAction<{ projectId: string; sketchId: string; name: string }>,
    ) {
      const { projectId, sketchId, name } = action.payload;
      const list = state.itemsByProject[projectId];
      if (!list) return;
      const sketch = list.find((s) => s.id === sketchId);
      if (sketch) {
        sketch.name = name;
        sketch.updatedAt = new Date().toISOString();
      }
    },
    deleteLocalSketch(
      state,
      action: PayloadAction<{ projectId: string; sketchId: string }>,
    ) {
      const { projectId, sketchId } = action.payload;
      if (!state.itemsByProject[projectId]) return;
      state.itemsByProject[projectId] = state.itemsByProject[projectId].filter(
        (s) => s.id !== sketchId,
      );
    },
  },
});

export const { saveLocalSketch, updateLocalSketch, deleteLocalSketch } =
  localSketchesSlice.actions;

export default localSketchesSlice.reducer;
