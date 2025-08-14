import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Empresa } from '../entities/empresa.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class EmpresaEventsListener {
  constructor(private emailService: EmailService) {}

  @OnEvent('empresa.created')
  async handleEmpresaCreatedEvent(empresa: Empresa) {
    await this.emailService.sendNewCompanyNotification(empresa);
  }
}
