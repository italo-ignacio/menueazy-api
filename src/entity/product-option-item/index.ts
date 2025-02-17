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
import { OrderProductOptionItemEntity } from '../order-product-option-item';
import { ProductEntity } from '../product';
import { ProductOptionGroupEntity } from '../product-option-group';

@Entity('product_option_item')
export class ProductOptionItemEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  public description: string | null;

  @Column({ type: 'text', name: 'image_url', nullable: true })
  public imageUrl: string | null;

  // @Column({ type: 'integer', name: 'product_id', nullable: true })
  // public productId: number | null;

  // @Column({ type: 'integer', name: 'product_option_group_id' })
  // public productOptionGroupId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productOptionItemList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity | null;

  @ManyToOne(
    () => ProductOptionGroupEntity,
    (productOptionGroup) => productOptionGroup.productOptionItemList,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false }
  )
  @JoinColumn([{ name: 'product_option_group_id', referencedColumnName: 'id' }])
  public productOptionGroup: ProductOptionGroupEntity;

  @OneToMany(
    () => OrderProductOptionItemEntity,
    (orderProductOptionItem) => orderProductOptionItem.productOptionItem
  )
  public orderProductOptionItemList: OrderProductOptionItemEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
