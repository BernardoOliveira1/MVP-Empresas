/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { NotFoundException } from '@nestjs/common';

describe('EmpresasController', () => {
  let controller: EmpresasController;
  const mockEmpresaService = jest.fn().mockImplementation(() => ({
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
    findAll: jest.fn(() => [
      {
        id: 1,
        nome: 'Empresa 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'Empresa 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

    findOne: jest.fn((id: number) => {
      if (+id === 1)
        return {
          id: 1,
          nome: 'Empresa 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      throw new NotFoundException();
    }),
    update: jest.fn((id: string, dto) => {
      return {
        id: +id,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
    remove: jest.fn((id: string) => {
      if (+id === 1) return { id: +id };
      throw new NotFoundException();
    }),
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
    const idNotPassed = '999';
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
    it('should throw an error when trying to update a Empresa that does not exist', async () => {
      try {
        await controller.update(idNotPassed,updateEmpresaDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('findAll', () => {
    it('should return an array of empresas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        expect.objectContaining({ id: 1, nome: 'Empresa 1' }),
        expect.objectContaining({ id: 2, nome: 'Empresa 2' }),
      ]);
    });
  });

  describe('findOne', () => {
    const idPassed = '1';
    const idNotPassed = '2';

    it('should return a single Empresa when it exists', async () => {
      const result = await controller.findOne(idPassed);
      expect(result).toEqual(
        expect.objectContaining({ id: 1, nome: 'Empresa 1' }),
      );
    });

    it('should throw NotFoundException when Empresa does not exist', async () => {
      try {
        await controller.findOne(idNotPassed);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    const idPassed = '1';
    const idNotPassed = '2';
    it('should remove a Empresa that exist', async () => {
      const result = await controller.remove(idPassed);
      expect(result).toBeUndefined();
    });
    it('should throw an error when trying to remove a Empresa that does not exist', async () => {
      try {
        await controller.remove(idNotPassed);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
