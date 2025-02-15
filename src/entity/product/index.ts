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
import { CompanyEntity } from '../company';
import { OrderProductEntity } from '../order-product';
import { ProductCategoryEntity } from '../product-category';
import { ProductImageEntity } from '../product-image';
import { ProductOptionGroupEntity } from '../product-option-group';
import { ProductOptionItemEntity } from '../product-option-item';
import { ProductRestaurantEntity } from '../product-restaurant';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ nullable: true, type: 'text' })
  public description: string | null;

  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.productList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

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

  @OneToMany(() => ProductRestaurantEntity, (productRestaurant) => productRestaurant.product)
  public productRestaurantList: ProductRestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
