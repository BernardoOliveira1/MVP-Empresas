import { IsString, Matches } from 'class-validator';
import { IsNotEmpty, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isValidCnpj } from '../utils/cnpj-utils';


@ValidatorConstraint({ name: 'CnpjValidator', async: false })
export class CnpjValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return isValidCnpj(value);
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}
export class CreateEmpresaDto {
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @Validate(CnpjValidator)
  cnpj: string;
  @IsString()
  fantasyName: string;
  @IsString()
  address: string;
}