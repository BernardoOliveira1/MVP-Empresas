import { Injectable } from '@nestjs/common';
import { Empresa } from '../entities/empresa.entity';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNewCompanyNotification(empresa: Empresa) {
    const emailRecipient = [
      'bernardo.rocha.oliveira@gmail.com',
      'bernardooliveira@kpmg.com.br',
    ];
    await this.mailerService.sendMail({
      to: emailRecipient,
      subject: `Nova Empresa Cadastrada: ${empresa.name}`,
      template: './empresa-adicionada',
      context: {
        nome: empresa.name,
        cnpj: empresa.cnpj,
        endereco: empresa.address,
      },
    });
    return true;
  }
}
