import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrderProductEntity } from '../order-product';
import { ProductOptionGroupEntity } from '../product-option-group';
import { ProductOptionItemEntity } from '../product-option-item';

@Entity('order_product_option_item')
export class OrderProductOptionItemEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'integer' })
  public quantity: number;

  @Column({ type: 'integer', name: 'order_product_id' })
  public orderProductId: number;

  @ManyToOne(() => OrderProductEntity, (orderProduct) => orderProduct.orderProductOptionItemList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'order_product_id', referencedColumnName: 'id' }])
  public orderProduct: OrderProductEntity;

  @Column({ type: 'integer', name: 'product_option_item_id' })
  public productOptionItemId: number;

  @ManyToOne(
    () => ProductOptionItemEntity,
    (productOptionItem) => productOptionItem.orderProductOptionItemList,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false }
  )
  @JoinColumn([{ name: 'product_option_item_id', referencedColumnName: 'id' }])
  public productOptionItem: ProductOptionItemEntity;

  @Column({ type: 'integer', name: 'product_option_group_id' })
  public productOptionGroupId: number;

  @ManyToOne(
    () => ProductOptionGroupEntity,
    (productOptionGroup) => productOptionGroup.orderProductOptionItemList,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false }
  )
  @JoinColumn([{ name: 'product_option_group_id', referencedColumnName: 'id' }])
  public productOptionGroup: ProductOptionGroupEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
