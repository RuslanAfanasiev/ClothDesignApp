import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import projectService, { CreateProjectDto, UpdateProjectDto } from '../../services/projectService';
import { normalizeError } from '../../utils/normalizeError';

export type ProjectStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';

export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  sketchCount?: number;
  previewUrl?: string;
}

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  selectedId: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await projectService.fetchAll();
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to load projects'));
    }
  },
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (dto: CreateProjectDto, { rejectWithValue }) => {
    try {
      return await projectService.create(dto);
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to create project'));
    }
  },
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, dto }: { id: string; dto: UpdateProjectDto }, { rejectWithValue }) => {
    try {
      return await projectService.update(id, dto);
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to update project'));
    }
  },
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await projectService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(normalizeError(err, 'Failed to delete project'));
    }
  },
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.pending, (state) => {
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.selectedId === action.payload) {
          state.selectedId = null;
        }
      });
  },
});

export const { selectProject, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
