import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppConstants } from '../../authify/constants';

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
      const res = await axios.get(`${AppConstants.API_URL}/projects`);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load projects');
    }
  },
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (payload: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${AppConstants.API_URL}/projects`, payload);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to create project');
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
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export const { selectProject, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
