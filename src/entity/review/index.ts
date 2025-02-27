import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Rate } from '../../domain/enum';
import { ClientEntity } from '../client';
import { OrderEntity } from '../order';
import { ProductEntity } from '../product';
import { RestaurantEntity } from '../restaurant';

@Index('review_client_id_order_id_idx', ['client', 'order'], {
  unique: true
})
@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'enum', name: 'rate', enum: Rate })
  public rate: Rate;

  @Column({ type: 'integer', name: 'client_id' })
  public clientId: number;

  @ManyToOne(() => ClientEntity, (client) => client.reviewList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity;

  @Column({ type: 'integer', name: 'order_id', nullable: true })
  public orderId: number | null;

  @ManyToOne(() => OrderEntity, (order) => order.reviewList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  public order: OrderEntity | null;

  @Column({ type: 'integer', name: 'product_id', nullable: true })
  public productId: number | null;

  @ManyToOne(() => ProductEntity, (product) => product.reviewList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.reviewList, {
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
