import { IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  name: string;
  @IsString()
  cnpj: string;
  @IsString()
  fantasyName: string;
  @IsString()
  address: string;
}
