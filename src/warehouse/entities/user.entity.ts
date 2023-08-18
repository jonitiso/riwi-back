import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 200 })
  foto: string;

  @Column('boolean')
  estado: boolean;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.responsable)
  bodegas: Warehouse[];

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
