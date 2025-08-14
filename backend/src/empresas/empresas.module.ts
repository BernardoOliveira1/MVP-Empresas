import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmailService } from './email/email.service';
import { EmpresaEventsListener } from './email/empresa-events.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  controllers: [EmpresasController],
  providers: [EmpresasService, EmailService, EmpresaEventsListener],
})
export class EmpresasModule {}
