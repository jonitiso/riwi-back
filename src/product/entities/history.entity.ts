import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Inventory } from './inventory.entity';

@Entity('historiales')
export class History {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('int', { width: 11 })
  cantidad: number;

  @Column('int', { width: 11 })
  id_bodega_origen: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.historicos_origen)
  @JoinColumn({ name: 'id_bodega_origen' })
  bodega_origen: Relation<Warehouse>;

  @Column('int', { width: 11 })
  id_bodega_destino: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.historicos_destino)
  @JoinColumn({ name: 'id_bodega_destino' })
  bodega_destino: Relation<Warehouse>;

  @Column('int', { width: 11 })
  id_inventario: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.historicos)
  @JoinColumn({ name: 'id_inventario' })
  inventario: Relation<Inventory>;

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
