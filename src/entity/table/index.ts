import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrderEntity } from '../order';
import { RestaurantEntity } from '../restaurant';

@Index('table_code_key', ['code'], { unique: true })
@Entity('table')
export class TableEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text' })
  public code: string;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  public description: string | null;

  // @Index()
  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.tableList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @OneToMany(() => OrderEntity, (order) => order.table)
  public orderList: OrderEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
