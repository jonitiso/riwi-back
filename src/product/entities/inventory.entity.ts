import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { History } from './history.entity';

@Entity('inventarios')
export class Inventory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('int', { width: 11, nullable: true })
  id_bodega: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventarios)
  @JoinColumn({ name: 'id_bodega' })
  bodega: Relation<Warehouse>;

  @Column('int', { width: 11, nullable: true })
  id_producto: number;

  @ManyToOne(() => Product, (product) => product.inventarios)
  @JoinColumn({ name: 'id_producto' })
  producto: Relation<Product>;

  @Column('int', { width: 11 })
  cantidad: number;

  @OneToMany(() => History, (history) => history.inventario)
  historicos: History[];

  // Timestamps
  @Column('int', { width: 11, nullable: true })
  created_by: number;

  @Column('int', { width: 11, nullable: true })
  updated_by: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;
}
