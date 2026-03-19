import { CreateProjectUseCase } from '../src/application/use-cases/projects/create-project.use-case';
import { ProjectRepository } from '../src/domain/repositories/project.repository';
import { ProjectStatus } from '../src/domain/enums/project-status.vo';
import { ProjectEntity } from '../src/domain/entities/project.entity';

describe('CreateProjectUseCase', () => {
  let useCase: CreateProjectUseCase;
  let repository: jest.Mocked<ProjectRepository>;

  const mockProject: ProjectEntity = {
    id: 'uuid-1',
    name: 'Test Project',
    description: 'A test project',
    ownerId: 'user-1',
    status: ProjectStatus.DRAFT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(mockProject),
      findById: jest.fn(),
      findAllByOwner: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<ProjectRepository>;

    useCase = new CreateProjectUseCase(repository);
  });

  it('should create a project with DRAFT status by default', async () => {
    const result = await useCase.execute(
      { name: 'Test Project', description: 'A test project' },
      'user-1',
    );

    expect(repository.create).toHaveBeenCalledWith({
      name: 'Test Project',
      description: 'A test project',
      ownerId: 'user-1',
      status: ProjectStatus.DRAFT,
    });
    expect(result).toEqual(mockProject);
  });

  it('should use provided status when given', async () => {
    await useCase.execute(
      { name: 'Test Project', status: ProjectStatus.IN_PROGRESS },
      'user-1',
    );

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ status: ProjectStatus.IN_PROGRESS }),
    );
  });

  it('should pass ownerId to repository', async () => {
    await useCase.execute({ name: 'Test Project' }, 'owner-123');

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ ownerId: 'owner-123' }),
    );
  });
});
