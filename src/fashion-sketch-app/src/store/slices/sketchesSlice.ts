import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sketchService, { Sketch, CreateSketchDto, UpdateSketchDto } from '../../services/sketchService';
import { normalizeError } from '../../utils/normalizeError';

interface SketchesState {
  itemsByProject: Record<string, Sketch[]>;
  loading: boolean;
  error: string | null;
}

const initialState: SketchesState = {
  itemsByProject: {},
  loading: false,
  error: null,
};

export const fetchSketches = createAsyncThunk(
  'sketches/fetchAll',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const sketches = await sketchService.fetchAll(projectId);
      return { projectId, sketches };
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to load sketches'));
    }
  },
);

export const createSketch = createAsyncThunk(
  'sketches/create',
  async ({ projectId, dto }: { projectId: string; dto: CreateSketchDto }, { rejectWithValue }) => {
    try {
      const sketch = await sketchService.create(projectId, dto);
      return { projectId, sketch };
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to create sketch'));
    }
  },
);

export const updateSketch = createAsyncThunk(
  'sketches/update',
  async (
    { projectId, sketchId, dto }: { projectId: string; sketchId: string; dto: UpdateSketchDto },
    { rejectWithValue },
  ) => {
    try {
      const sketch = await sketchService.update(projectId, sketchId, dto);
      return { projectId, sketch };
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to update sketch'));
    }
  },
);

export const deleteSketch = createAsyncThunk(
  'sketches/delete',
  async ({ projectId, sketchId }: { projectId: string; sketchId: string }, { rejectWithValue }) => {
    try {
      await sketchService.delete(projectId, sketchId);
      return { projectId, sketchId };
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to delete sketch'));
    }
  },
);

const sketchesSlice = createSlice({
  name: 'sketches',
  initialState,
  reducers: {
    clearSketchError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSketches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSketches.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsByProject[action.payload.projectId] = action.payload.sketches ?? [];
      })
      .addCase(fetchSketches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSketch.fulfilled, (state, action) => {
        const { projectId, sketch } = action.payload;
        if (!state.itemsByProject[projectId]) {
          state.itemsByProject[projectId] = [];
        }
        state.itemsByProject[projectId].unshift(sketch);
      })
      .addCase(updateSketch.fulfilled, (state, action) => {
        const { projectId, sketch } = action.payload;
        const list = state.itemsByProject[projectId];
        if (list) {
          const idx = list.findIndex((s) => s.id === sketch.id);
          if (idx !== -1) {
            list[idx] = sketch;
          }
        }
      })
      .addCase(deleteSketch.fulfilled, (state, action) => {
        const { projectId, sketchId } = action.payload;
        const list = state.itemsByProject[projectId];
        if (list) {
          state.itemsByProject[projectId] = list.filter((s) => s.id !== sketchId);
        }
      });
  },
});

export const { clearSketchError } = sketchesSlice.actions;
export { Sketch };
export default sketchesSlice.reducer;
