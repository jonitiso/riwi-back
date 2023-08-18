import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from "typeorm";
import { Inventory } from '../../product/entities/inventory.entity';
import { History } from '../../product/entities/history.entity';
import { User } from './user.entity';

@Entity('bodegas')
export class Warehouse {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 30 })
  nombre: string;

  @Column('int', { width: 11, nullable: true })
  id_responsable?: number;

  @ManyToOne(() => User, (user) => user.bodegas)
  @JoinColumn({ name: 'id_responsable' })
  responsable: Relation<User>;

  @Column('boolean')
  estado: boolean;

  @OneToMany(() => Inventory, (inventory) => inventory.bodega)
  inventarios: Inventory[];

  @OneToMany(() => History, (history) => history.bodega_origen)
  historicos_origen: History[];

  @OneToMany(() => History, (history) => history.bodega_destino)
  historicos_destino: History[];

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
