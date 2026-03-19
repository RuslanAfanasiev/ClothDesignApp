import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootState, AppDispatch } from '../../../store';
import { fetchTemplates, deleteTemplate } from '../../../store/slices/templatesSlice';
import { setSketchTemplate } from '../../../store/slices/canvasSlice';
import { Template } from '../../../interfaces/template.interface';

interface TemplatesContextType {
  templates: Template[];
  loading: boolean;
  error: string | null;
  selectedProject: RootState['projects']['items'][0] | undefined;
  createModalVisible: boolean;
  setCreateModalVisible: (v: boolean) => void;
  handleUse: (template: Template) => void;
  handleDelete: (template: Template) => void;
  handleRefresh: () => void;
}

const TemplatesContext = createContext<TemplatesContextType>({} as TemplatesContextType);

export const useTemplatesContext = () => useContext(TemplatesContext);

export const TemplatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const selectedProjectId = useSelector((state: RootState) => state.projects.selectedId);
  const selectedProject = useSelector(
    (state: RootState) => state.projects.items.find((p) => p.id === selectedProjectId),
    shallowEqual,
  );
  const templates = useSelector((state: RootState) => state.templates.items, shallowEqual);
  const loading = useSelector((state: RootState) => state.templates.loading);
  const error = useSelector((state: RootState) => state.templates.error);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchTemplates());
  };

  const handleUse = (template: Template) => {
    if (!selectedProjectId) {
      Alert.alert('No Project Selected', 'Select a project from the Projects tab first.');
      return;
    }
    dispatch(setSketchTemplate({ sketchKey: `new_${selectedProjectId}`, templateUrl: template.imageUrl ?? null }));
    navigation.navigate('Canvas');
  };

  const handleDelete = (template: Template) => {
    Alert.alert('Delete Template', `Delete "${template.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTemplate(template.id)) },
    ]);
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        loading,
        error,
        selectedProject,
        createModalVisible,
        setCreateModalVisible,
        handleUse,
        handleDelete,
        handleRefresh,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};
