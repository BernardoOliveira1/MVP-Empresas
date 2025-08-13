import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';

describe('EmpresasController', () => {
  let controller: EmpresasController;
  const mockEmpresaService = jest.fn().mockImplementation(() => ({
    create: jest.fn((dto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn((id: number, dto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        id: id,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
    remove: jest.fn(),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresasController],
      providers: [EmpresasService],
    })
      .overrideProvider(EmpresasService)
      .useValue(new mockEmpresaService())
      .compile();

    controller = module.get<EmpresasController>(EmpresasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    const createEmpresaDto = {
      name: 'Empresa Teste',
      cnpj: '1234567890',
      fantasyName: 'Empresa Teste',
      address: 'Rua Teste',
    };
    it('should create a new Empresa', async () => {
      const result = await controller.create(createEmpresaDto);
      expect(result).toEqual(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(Number),
          ...createEmpresaDto,
        }),
      );
    });
  });
  describe('update', () => {
    const id = '2';
    const updateEmpresaDto = {
      name: 'Empresa Teste',
      cnpj: '1234567890',
      fantasyName: 'Empresa Teste',
      address: 'Rua Teste',
    };
    it('should update a Empresa', async () => {
      const result = await controller.update(id, updateEmpresaDto);
      expect(result).toEqual(
        expect.objectContaining({
          id: Number(id),
          ...updateEmpresaDto,
        }),
      );
    });
  });
});
