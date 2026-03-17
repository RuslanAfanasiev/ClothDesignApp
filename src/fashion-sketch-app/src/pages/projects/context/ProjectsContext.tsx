import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../../store';
import {
  fetchProjects,
  selectProject,
  ProjectStatus,
} from '../../../store/slices/projectsSlice';
import { setActiveSketchKey, setSketchTemplate } from '../../../store/slices/canvasSlice';

export type FilterType = 'ALL' | ProjectStatus;

export const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'DRAFT', label: 'Draft' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
];

interface ProjectsContextType {
  items: ReturnType<typeof useSelector<RootState, RootState['projects']['items']>>;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (v: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (f: FilterType) => void;
  filtered: RootState['projects']['items'];
  handleProjectPress: (id: string) => void;
  handleRefresh: () => void;
}

const ProjectsContext = createContext<ProjectsContextType>({} as ProjectsContextType);

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { items, loading, error } = useSelector((s: RootState) => s.projects);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const filtered = useMemo(() => {
    let list = [...items];
    if (activeFilter !== 'ALL') list = list.filter((p) => p.status === activeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list.sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime(),
    );
  }, [items, activeFilter, search]);

  const handleProjectPress = (id: string) => {
    const sketchKey = `new_${id}`;
    dispatch(selectProject(id));
    dispatch(setActiveSketchKey(sketchKey));
    dispatch(setSketchTemplate({ sketchKey, templateUrl: null }));
    navigation.navigate('Canvas');
  };

  const handleRefresh = () => {
    dispatch(fetchProjects());
  };

  return (
    <ProjectsContext.Provider
      value={{
        items,
        loading,
        error,
        search,
        setSearch,
        activeFilter,
        setActiveFilter,
        filtered,
        handleProjectPress,
        handleRefresh,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
