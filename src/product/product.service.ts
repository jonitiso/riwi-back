import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { History } from './entities/history.entity';

const INITIAL_QTY = 10;

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      order: { nombre: 'ASC' },
      relations: ['inventarios'],
    });

    products.forEach((product) => {
      product.total = product.inventarios.reduce((acc, inventory) => {
        return acc + inventory.cantidad;
      }, 0);
      delete product.inventarios;
    });

    return products.sort((a, b) => b.total - a.total);
  }

  async create(payload: Product): Promise<Product> {
    const product = await this.productRepository.save(payload);

    // get random warehouse
    const warehouse = await this.warehouseRepository
      .createQueryBuilder()
      .orderBy('RAND()')
      .getOne();

    const inv = await this.inventoryRepository.create({
      cantidad: INITIAL_QTY,
      id_producto: product.id,
      id_bodega: warehouse.id,
    });

    await this.inventoryRepository.save(inv);

    return product;
  }

  async transfer(payload: any): Promise<any> {
    const { product_id, quantity, from_warehouse_id, to_warehouse_id } =
      payload;

    const fromInventory = await this.inventoryRepository.findOneOrFail({
      where: {
        id_producto: product_id,
        id_bodega: from_warehouse_id,
      },
    });

    if (!fromInventory) {
      throw new NotFoundException(
        'No se encontró inventario en la bodega de origen',
      );
    }

    if (fromInventory.cantidad < quantity) {
      throw new BadRequestException(
        'La cantidad a transferir es mayor a la cantidad disponible',
      );
    }

    let toInventory;
    toInventory = await this.inventoryRepository.findOne({
      where: {
        id_producto: product_id,
        id_bodega: to_warehouse_id,
      },
    });

    if (!toInventory) {
      toInventory = await this.inventoryRepository.save({
        cantidad: 0,
        id_producto: product_id,
        id_bodega: to_warehouse_id,
      } as Inventory);
    }

    // quitar cantidad de la bodega de origen
    await this.inventoryRepository.decrement(
      { id: fromInventory.id },
      'cantidad',
      quantity,
    );

    // agregar cantidad a la bodega de destino
    await this.inventoryRepository.increment(
      { id: toInventory.id },
      'cantidad',
      quantity,
    );

    const history: Partial<History> = {
      cantidad: quantity,
      id_bodega_origen: from_warehouse_id,
      id_bodega_destino: to_warehouse_id,
      id_inventario: toInventory.id,
    };
    await this.historyRepository.save(history);
  }
}
