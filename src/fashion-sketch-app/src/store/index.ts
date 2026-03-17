import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './slices/canvasSlice';
import projectsReducer from './slices/projectsSlice';
import sketchesReducer from './slices/sketchesSlice';
import templatesReducer from './slices/templatesSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    projects: projectsReducer,
    sketches: sketchesReducer,
    templates: templatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
