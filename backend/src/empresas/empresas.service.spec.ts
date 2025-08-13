/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from './empresas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';

describe('EmpresasService', () => {
  let service: EmpresasService;

  const mockEmpresaRepository = {
    create: jest.fn((empresaDto) => empresaDto),
    save: jest.fn((empresaDto) => Promise.resolve({ id: 1, ...empresaDto })),
    find: jest.fn(() => Promise.resolve([{ id: 1, name: 'Empresa X' }])),
    findOneBy: jest.fn((id: number): Promise<Empresa | null> => {
      return Promise.resolve({ id: id, name: 'Empresa X' } as Empresa);
    }),
    merge: jest.fn((entity, dto) => Object.assign(entity, dto)),
    remove: jest.fn((entity) => Promise.resolve(entity)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpresasService,
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockEmpresaRepository,
        },
      ],
    }).compile();

    service = module.get<EmpresasService>(EmpresasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an Empresa record and return it', async () => {
    const createEmpresaDto = {
      name: 'Empresa Teste',
      cnpj: '1234567890',
      fantasyName: 'Empresa Teste',
      address: 'Rua Teste',
    };
    const result = await service.create(createEmpresaDto);
    expect(result).toEqual(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(Number),
        ...createEmpresaDto,
      }),
    );
  });
  it('should return all empresas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, name: 'Empresa X' }]);
  });

  it('should return one empresa by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, name: 'Empresa X' });
  });

  it('should return null when updating non-existent empresa', async () => {
    mockEmpresaRepository.findOneBy.mockResolvedValueOnce(null);
    const result = await service.update(999, { name: 'Test' });
    expect(result).toBeNull();
  });

  it('should remove an existing empresa', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id: 1, name: 'Empresa X' });
  });

  it('should return null when removing non-existent empresa', async () => {
    mockEmpresaRepository.findOneBy.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBeNull();
  });

  it('should update an Empresa record and return it', async () => {
    const updateEmpresaDto = {
      name: 'Empresa Teste',
      cnpj: '1234567890',
      fantasyName: 'Empresa Teste',
      address: 'Rua Teste',
    };
    const result = await service.update(1, updateEmpresaDto);
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        ...updateEmpresaDto,
      }),
    );
  });
});
