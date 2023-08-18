import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';

export type CreateInventoryDTO = {
  id_producto: number;
  id_bodega: number;
  cantidad: number;
};

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(payload: CreateInventoryDTO): Promise<Inventory> {
    const duplicatedInv = await this.inventoryRepository.findOne({
      where: {
        id_producto: payload.id_producto,
        id_bodega: payload.id_bodega,
      },
    });

    if (duplicatedInv) {
      await this.inventoryRepository.update(duplicatedInv.id, {
        cantidad: duplicatedInv.cantidad + payload.cantidad,
      });

      return await this.inventoryRepository.findOne({
        where: { id: duplicatedInv.id },
      });
    }

    return await this.inventoryRepository.save(payload);
  }
}
