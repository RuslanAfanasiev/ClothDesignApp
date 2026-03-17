import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../../store';
import { fetchSketches, deleteSketch } from '../../../store/slices/sketchesSlice';
import { setActiveSketchKey, setSketchTemplate } from '../../../store/slices/canvasSlice';
import { deleteLocalSketch } from '../../../store/slices/localSketchesSlice';
import { Sketch } from '../../../services/sketchService';
import { Alert } from 'react-native';

interface SketchesContextType {
  selectedId: string | null;
  project: RootState['projects']['items'][0] | undefined;
  sketches: Sketch[];
  loading: boolean;
  error: string | null;
  handleRefresh: () => void;
  handleOpenCanvas: (sketch: Sketch) => void;
  handleDelete: (sketch: Sketch) => void;
  handleNewCanvas: () => void;
}

const SketchesContext = createContext<SketchesContextType>({} as SketchesContextType);

export const useSketchesContext = () => useContext(SketchesContext);

export const SketchesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

  const selectedId = useSelector((state: RootState) => state.projects.selectedId);
  const project = useSelector(
    (state: RootState) => state.projects.items.find((p) => p.id === selectedId),
    shallowEqual,
  );
  const sketches: Sketch[] = useSelector((state: RootState) => {
    const apiList = selectedId ? (state.sketches.itemsByProject[selectedId] ?? []) : [];
    const localList = selectedId ? (state.localSketches?.itemsByProject?.[selectedId] ?? []) : [];
    return [...apiList, ...localList].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, shallowEqual);
  const loading = useSelector((state: RootState) => state.sketches.loading);
  const error = useSelector((state: RootState) => state.sketches.error);

  useEffect(() => {
    if (selectedId) dispatch(fetchSketches(selectedId));
  }, [selectedId]);

  const handleRefresh = useCallback(() => {
    if (selectedId) dispatch(fetchSketches(selectedId));
  }, [selectedId]);

  const handleOpenCanvas = useCallback((sketch: Sketch) => {
    if (!selectedId) return;
    dispatch(setActiveSketchKey(sketch.id));
    // For local sketches, paths are already in canvas state — no template to set from imageUrl
    if (!(sketch as any).isLocal) {
      dispatch(setSketchTemplate({ sketchKey: sketch.id, templateUrl: sketch.imageUrl ?? null }));
    }
    navigation.navigate('Canvas', { editSketchId: sketch.id, editSketchName: sketch.name });
  }, [selectedId]);

  const handleDelete = useCallback((sketch: Sketch) => {
    if (!selectedId) return;
    Alert.alert('Delete Sketch', `Delete "${sketch.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if ((sketch as any).isLocal) {
            dispatch(deleteLocalSketch({ projectId: selectedId, sketchId: sketch.id }));
          } else {
            dispatch(deleteSketch({ projectId: selectedId, sketchId: sketch.id }));
          }
        },
      },
    ]);
  }, [selectedId]);

  const handleNewCanvas = useCallback(() => {
    if (selectedId) {
      const sketchKey = `new_${selectedId}`;
      dispatch(setActiveSketchKey(sketchKey));
      dispatch(setSketchTemplate({ sketchKey, templateUrl: null }));
    }
    navigation.navigate('Canvas');
  }, [selectedId]);

  return (
    <SketchesContext.Provider
      value={{
        selectedId,
        project,
        sketches,
        loading,
        error,
        handleRefresh,
        handleOpenCanvas,
        handleDelete,
        handleNewCanvas,
      }}
    >
      {children}
    </SketchesContext.Provider>
  );
};
