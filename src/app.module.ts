import { Module } from '@nestjs/common';
import { WarehouseModule } from './warehouse/warehouse.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Warehouse } from './warehouse/entities/warehouse.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Inventory } from './product/entities/inventory.entity';
import { History } from './product/entities/history.entity';
import { User } from './warehouse/entities/user.entity';

const entities = [Product, Warehouse, Inventory, History, User];

@Module({
  imports: [
    WarehouseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: parseInt(config.get('DB_PORT'), 10),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          logging: config.get('NODE_ENV') === 'dev',
          entities,
          synchronize: true,
        };
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
