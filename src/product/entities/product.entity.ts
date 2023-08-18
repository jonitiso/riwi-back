import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity('productos')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 30 })
  nombre: string;

  @Column('varchar', { length: 300 })
  descripcion: number;

  @Column('boolean')
  estado: boolean;

  // computed property
  total: number;

  @OneToMany(() => Inventory, (inventory) => inventory.producto)
  inventarios: Inventory[];

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
