import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Rate } from '../../domain/enum';
import { ClientEntity } from '../client';
import { OrderEntity } from '../order';
import { ProductEntity } from '../product';
import { RestaurantEntity } from '../restaurant';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'float', name: 'rate_numeric' })
  public rateNumeric: number;

  @Column({ type: 'enum', enum: Rate })
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

  @OneToOne(() => OrderEntity, (order) => order.review, { nullable: true })
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
