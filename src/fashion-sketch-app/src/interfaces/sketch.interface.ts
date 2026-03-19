export interface Sketch {
  id: string;
  name: string;
  projectId: string;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalSketch extends Sketch {
  isLocal: true;
}

export interface SketchesState {
  itemsByProject: Record<string, Sketch[]>;
  loading: boolean;
  error: string | null;
}

export interface LocalSketchesState {
  itemsByProject: Record<string, LocalSketch[]>;
}

export interface CreateSketchDto {
  name: string;
  imageUrl?: string;
  notes?: string;
}

export interface UpdateSketchDto {
  name?: string;
  imageUrl?: string;
  notes?: string;
}
