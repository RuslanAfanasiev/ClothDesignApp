import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import templateService, { Template, CreateTemplateDto, UpdateTemplateDto } from '../../services/templateService';
import { normalizeError } from '../../utils/normalizeError';

interface TemplatesState {
  items: Template[];
  loading: boolean;
  error: string | null;
}

const initialState: TemplatesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTemplates = createAsyncThunk(
  'templates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await templateService.fetchAll();
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to load templates'));
    }
  },
);

export const createTemplate = createAsyncThunk(
  'templates/create',
  async (dto: CreateTemplateDto, { rejectWithValue }) => {
    try {
      return await templateService.create(dto);
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to create template'));
    }
  },
);

export const updateTemplate = createAsyncThunk(
  'templates/update',
  async ({ id, dto }: { id: string; dto: UpdateTemplateDto }, { rejectWithValue }) => {
    try {
      return await templateService.update(id, dto);
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to update template'));
    }
  },
);

export const deleteTemplate = createAsyncThunk(
  'templates/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await templateService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to delete template'));
    }
  },
);

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    clearTemplateError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearTemplateError } = templatesSlice.actions;
export { Template };
export default templatesSlice.reducer;
