import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly repository: Repository<Empresa>,
  ) {}

  create(dto: CreateEmpresaDto) {
    const empresa = this.repository.create(dto);
    return this.repository.save(empresa);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  async update(id: number, dto: UpdateEmpresaDto) {
    const empresa = await this.repository.findOneBy({ id: id });
    if (!empresa) return null;
    this.repository.merge(empresa, dto);
    return this.repository.save(empresa);
  }

  async remove(id: number) {
    const empresa = await this.repository.findOneBy({ id: id });
    if (!empresa) return null;
    return this.repository.remove(empresa);
  }
}
