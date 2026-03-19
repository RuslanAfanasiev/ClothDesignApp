export interface Template {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface TemplatesState {
  items: Template[];
  loading: boolean;
  error: string | null;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic?: boolean;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isPublic?: boolean;
}
