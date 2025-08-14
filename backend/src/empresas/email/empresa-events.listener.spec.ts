/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Empresa } from '../entities/empresa.entity';
import { EmpresaEventsListener } from './empresa-events.listener';

const mockEmailService = { sendNewCompanyNotification: jest.fn() };
const listener = new EmpresaEventsListener(mockEmailService as any);

it('deve enviar e-mail ao receber evento', async () => {
  const empresa = { id: 1, name: 'Empresa X' } as Empresa;
  await listener.handleEmpresaCreatedEvent(empresa);
  expect(mockEmailService.sendNewCompanyNotification).toHaveBeenCalledWith(
    empresa,
  );
});
