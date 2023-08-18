import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateInventoryDTO, InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly inventoryService: InventoryService,
  ) {}

  @Get('products')
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post('products')
  async create(@Body() product: Product): Promise<Product> {
    console.log('product', product);
    return await this.productService.create(product);
  }

  @Post('inventories')
  async createInventory(
    @Body() inventory: CreateInventoryDTO,
  ): Promise<Inventory> {
    return await this.inventoryService.create(inventory);
  }

  @Post('products/transfer')
  async transfer(@Body() payload: any): Promise<any> {
    return await this.productService.transfer(payload);
  }
}
