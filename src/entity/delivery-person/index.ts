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

@Index('delivery_person_name_restaurant_id_key', ['name', 'restaurant'], { unique: true })
@Entity('delivery_person')
export class DeliveryPersonEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ length: 25, type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @OneToMany(() => OrderEntity, (order) => order.deliveryPerson)
  public orderList: OrderEntity[];

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.deliveryPersonList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
