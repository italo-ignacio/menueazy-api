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
import { ProductEntity } from '../product';
import { RestaurantEntity } from '../restaurant';
import { ReviewEntity } from '../review';

@Entity('product_restaurant')
export class ProductRestaurantEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public price: string;

  @Column({ type: 'boolean', name: 'out_of_stock', default: false })
  public outOfStock: boolean;

  @Column({ name: 'start_sell_at', type: 'timestamptz' })
  public startSellAt: Date;

  @Column({ name: 'finish_sell_at', type: 'timestamptz', nullable: true })
  public finishSellAt: Date | null;

  @Column({ type: 'numeric', nullable: true, precision: 10, scale: 2 })
  public discount: number | null;

  @Column({ name: 'start_discount_at', type: 'timestamptz', nullable: true })
  public startDiscountAt: Date | null;

  @Column({ name: 'finish_discount_at', type: 'timestamptz', nullable: true })
  public finishDiscountAt: Date | null;

  @Column({ name: 'only_in_restaurant', type: 'boolean', default: false })
  public onlyInRestaurant: boolean;

  @Column({
    type: 'numeric',
    name: 'value_by_km_in_delivery',
    nullable: true,
    precision: 10,
    scale: 2
  })
  public valueByKmInDelivery: string | null;

  // @Index()
  // @Column({ name: 'restaurant_id', type: 'integer' })
  // public restaurantId: number;

  // @Index()
  // @Column({ name: 'product_id', type: 'integer' })
  // public productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productRestaurantList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.productRestaurantList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @OneToMany(() => ReviewEntity, (review) => review.productRestaurant)
  public reviewList: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
