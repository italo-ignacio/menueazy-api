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
import { ProductIngredientEntity } from '../product-ingredient';
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

  @Column({ type: 'float4' })
  public price: number;

  @Column({ type: 'float4', default: 0, name: 'final_price' })
  public finalPrice: number;

  @Column({ type: 'boolean', name: 'in_stock', default: true })
  public inStock: boolean;

  @Column({ type: 'float4', nullable: true })
  public discount: number | null;

  @Column({ name: 'start_discount_at', type: 'timestamptz', nullable: true })
  public startDiscountAt: Date | null;

  @Column({ name: 'finish_discount_at', type: 'timestamptz', nullable: true })
  public finishDiscountAt: Date | null;

  @Column({ name: 'only_in_restaurant', type: 'boolean', default: false })
  public onlyInRestaurant: boolean;

  @Column({ type: 'boolean', default: false })
  public published: boolean;

  @Column({ type: 'boolean', default: false })
  public highlight: boolean;

  @Column({ type: 'float4', name: 'price_by_km_in_delivery', nullable: true })
  public priceByKmInDelivery: number | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @Column({ type: 'int', default: 0, name: 'total_order' })
  public totalOrder: number;

  @Column({ type: 'int', default: 0, name: 'total_rate' })
  public totalRate: number;

  @Column({ type: 'float4', default: 0, name: 'avg_rate' })
  public avgRate: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.productList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @Column({ type: 'integer', name: 'max_additional_ingredient', default: 9 })
  public maxAdditionalIngredient: number;

  @OneToMany(() => ProductIngredientEntity, (productIngredient) => productIngredient.product)
  public productIngredientList: ProductIngredientEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  public orderProductList: OrderProductEntity[];

  @OneToMany(() => ProductCategoryEntity, (productCategory) => productCategory.product)
  public productCategoryList: ProductCategoryEntity[];

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product, { eager: true })
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
