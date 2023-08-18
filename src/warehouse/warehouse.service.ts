import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  findAll() {
    return this.warehouseRepository.find({ order: { nombre: 'ASC' } });
  }

  /* Esta función recibe como parametros un objeto json de tipo Warehouse
  Ejemplo: {
      "nombre": "Bodega de prueba",
      "id_responsable": 1,
      "estado": true,
      "created_by": 1,
      "updated_by": 1
  } */
  create(payload: Warehouse) {
    return this.warehouseRepository.save(payload);
  }
}
