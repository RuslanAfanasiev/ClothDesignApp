import { CreateSketchUseCase } from './create-sketch.use-case';
import { SketchRepository } from '../../../domain/repositories/sketch.repository';
import { SketchEntity } from '../../../domain/entities/sketch.entity';

describe('CreateSketchUseCase', () => {
  let useCase: CreateSketchUseCase;
  let repository: jest.Mocked<SketchRepository>;

  const mockSketch: SketchEntity = {
    id: 'sketch-1',
    name: 'Front View',
    imageUrl: 'https://storage.example.com/sketch.png',
    notes: null,
    projectId: 'project-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(mockSketch),
      findById: jest.fn(),
      findAllByProject: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<SketchRepository>;

    useCase = new CreateSketchUseCase(repository);
  });

  it('should create a sketch with all fields', async () => {
    const result = await useCase.execute({
      projectId: 'project-1',
      name: 'Front View',
      imageUrl: 'https://storage.example.com/sketch.png',
    });

    expect(repository.create).toHaveBeenCalledWith({
      name: 'Front View',
      projectId: 'project-1',
      imageUrl: 'https://storage.example.com/sketch.png',
      notes: undefined,
    });
    expect(result).toEqual(mockSketch);
  });

  it('should create a sketch without optional fields', async () => {
    await useCase.execute({ projectId: 'project-1', name: 'Quick Sketch' });

    expect(repository.create).toHaveBeenCalledWith({
      name: 'Quick Sketch',
      projectId: 'project-1',
      imageUrl: undefined,
      notes: undefined,
    });
  });
});
