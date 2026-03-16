import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './slices/canvasSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
