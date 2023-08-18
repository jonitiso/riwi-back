import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Inventory } from './entities/inventory.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { InventoryService } from './inventory.service';
import { History } from './entities/history.entity';

@Module({
  providers: [ProductService, InventoryService],
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product, Inventory, Warehouse, History])],
})
export class ProductModule {}
