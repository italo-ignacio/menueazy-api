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
import { ProductStatus } from '../../domain/enum';
import { OrderEntity } from '../order';
import { OrderProductOptionItemEntity } from '../order-product-option-item';
import { ProductEntity } from '../product';

@Entity('order_product')
export class OrderProductEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text', nullable: true })
  public observation: string | null;

  // @Index()
  // @Column({ type: 'integer', name: 'order_id' })
  // public orderId: number;

  // @Index()
  // @Column({ type: 'integer', name: 'product_id' })
  // public productId: number;

  @Column({ type: 'integer' })
  public quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public price: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public subtotal: number;

  @Column({
    type: 'enum',
    name: 'status',
    enum: ProductStatus,
    default: ProductStatus.PENDING
  })
  public status: ProductStatus;

  @ManyToOne(() => OrderEntity, (order) => order.orderProductList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  public order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProductList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  public product: ProductEntity;

  @OneToMany(
    () => OrderProductOptionItemEntity,
    (orderProductOptionItem) => orderProductOptionItem.orderProduct
  )
  public orderProductOptionItemList: OrderProductOptionItemEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
