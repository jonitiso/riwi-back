import { Body, Controller, Get, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  getWarehouses() {
    return this.warehouseService.findAll();
  }

  @Post()
  createWarehouse(@Body() payload: Warehouse) {
    return this.warehouseService.create(payload);
  }
}
