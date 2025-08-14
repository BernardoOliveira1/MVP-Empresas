import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from './empresas/empresas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresas/entities/empresa.entity';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

class MockEmailService {
  sendNewCompanyNotification = jest.fn();
}

describe('EmpresasService (Integration)', () => {
  let service: EmpresasService;
  let emailService: MockEmailService;

  beforeAll(async () => {
    emailService = new MockEmailService();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Empresa],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Empresa]),
      ],
      providers: [
        EmpresasService,
        { provide: 'EmailService', useValue: emailService }, // Mockado
      ],
    }).compile();

    service = module.get<EmpresasService>(EmpresasService);

    // Listener de evento mockado para simular envio de e-mail
    const eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    eventEmitter.on('empresa.created', (empresa) => {
      emailService.sendNewCompanyNotification(empresa);
    });
  });

  it('deve criar uma nova empresa e enviar notificação por e-mail', async () => {
    await service.create({
      name: 'Empresa X',
      cnpj: '123456789',
      fantasyName: 'Fantasia X',
      address: 'Rua Teste',
    });

    expect(emailService.sendNewCompanyNotification).toHaveBeenCalledTimes(1);
    expect(emailService.sendNewCompanyNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Empresa X',
        cnpj: '123456789',
      }),
    );
  });
});
