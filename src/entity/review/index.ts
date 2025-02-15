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
import { CompanyEntity } from '../company';
import { OrderEntity } from '../order';
import { ProductRestaurantEntity } from '../product-restaurant';
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

  // @Column({ type: 'integer', name: 'client_id' })
  // public clientId: number;

  @ManyToOne(() => ClientEntity, (client) => client.reviewList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity;

  // @Index()
  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.reviewList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  // @Column({ type: 'integer', name: 'order_id', nullable: true })
  // public orderId: number | null;

  @ManyToOne(() => OrderEntity, (order) => order.reviewList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  public order: OrderEntity | null;

  // @Column({ type: 'integer', name: 'product_restaurant_id', nullable: true })
  // public productRestaurantId: number | null;

  @ManyToOne(() => ProductRestaurantEntity, (productRestaurant) => productRestaurant.reviewList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'product_restaurant_id', referencedColumnName: 'id' }])
  public productRestaurant: ProductRestaurantEntity | null;

  // @Index()
  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.reviewList, {
    onUpdate: 'CASCADE'
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
