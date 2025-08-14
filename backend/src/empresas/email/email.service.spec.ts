import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Empresa } from '../entities/empresa.entity';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true), // simula envio de email
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a new company notification email', async () => {
    const empresa: Empresa = {
      id: 1,
      name: 'Empresa X',
      cnpj: '1234567890',
      address: 'Rua Teste',
    } as Empresa;

    const result = await service.sendNewCompanyNotification(empresa);

    expect(result).toBe(true);
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: ['bernardo.rocha.oliveira@gmail.com', 'bernardooliveira@kpmg.com.br'],
      subject: `Nova Empresa Cadastrada: ${empresa.name}`,
      template: './empresa-adicionada',
      context: {
        nome: empresa.name,
        cnpj: empresa.cnpj,
        endereco: empresa.address,
      },
    });
  });
});
