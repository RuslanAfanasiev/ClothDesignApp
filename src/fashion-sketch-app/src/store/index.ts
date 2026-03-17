import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import canvasReducer from './slices/canvasSlice';
import projectsReducer from './slices/projectsSlice';
import sketchesReducer from './slices/sketchesSlice';
import templatesReducer from './slices/templatesSlice';
import localSketchesReducer from './slices/localSketchesSlice';

const RESET_STORE = 'store/reset';

export const resetStore = () => ({ type: RESET_STORE as typeof RESET_STORE });

// Persist canvas paths + tool settings; skip transient AI state
const canvasPersistConfig = {
  key: 'canvas',
  storage: AsyncStorage,
  blacklist: ['isAISuggesting', 'aiSuggestions', 'aiSuggestionsLoading', 'aiSuggestionsError', 'historyBySketch'],
};

// Persist only the selected project ID
const projectsPersistConfig = {
  key: 'projects',
  storage: AsyncStorage,
  whitelist: ['selectedId'],
};

// Persist all local sketches
const localSketchesPersistConfig = {
  key: 'localSketches',
  storage: AsyncStorage,
};

const combinedReducer = combineReducers({
  canvas: persistReducer(canvasPersistConfig, canvasReducer),
  projects: persistReducer(projectsPersistConfig, projectsReducer),
  sketches: sketchesReducer,
  templates: templatesReducer,
  localSketches: persistReducer(localSketchesPersistConfig, localSketchesReducer),
});

const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: any) => {
  if (action.type === RESET_STORE) {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
