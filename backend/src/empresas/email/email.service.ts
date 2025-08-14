import { Injectable } from '@nestjs/common';
import { Empresa } from '../entities/empresa.entity';
@Injectable()
export class EmailService {
  private readonly emailRecipient = 'carlos@empresab.com';

  // eslint-disable-next-line @typescript-eslint/require-await
  async sendNewCompanyNotification(empresa: Empresa) {
    //TODO: integrar ao SMTP
    //TODO: enviar e-mail
    //TODO: error handling se necessário
    console.log(
      `Enviando e-mail sobre ${empresa.name} para: ${this.emailRecipient}`,
    );
    return true;
  }
}
