import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly repository: Repository<Empresa>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateEmpresaDto) {
    const empresa = this.repository.create(dto);
    const saved = await this.repository.save(empresa);

    //? ENVIO DESACOPLADO DO MÉTODO CREATE (MANTÉM RESTFUL E MAIS LIMPO)
    this.eventEmitter.emit('empresa.created', saved);
    return saved;
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
