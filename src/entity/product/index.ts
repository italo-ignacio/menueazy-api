import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrderProductEntity } from '../order-product';
import { ProductCategoryEntity } from '../product-category';
import { ProductImageEntity } from '../product-image';
import { ProductOptionGroupEntity } from '../product-option-group';
import { ProductOptionItemEntity } from '../product-option-item';
import { RestaurantEntity } from '../restaurant';
import { ReviewEntity } from '../review';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ nullable: true, type: 'text' })
  public description: string | null;

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

  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.productList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  public orderProductList: OrderProductEntity[];

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.product)
  public productCategoryList: ProductCategoryEntity[];

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
  public productImageList: ProductImageEntity[];

  @OneToMany(() => ProductOptionGroupEntity, (productOptionGroup) => productOptionGroup.product)
  public productOptionGroupList: ProductOptionGroupEntity[];

  @OneToMany(() => ProductOptionItemEntity, (productOptionItem) => productOptionItem.product)
  public productOptionItemList: ProductOptionItemEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  public reviewList: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
