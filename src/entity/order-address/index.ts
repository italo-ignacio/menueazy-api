import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AddressEntity } from '../address';
import { OrderEntity } from '../order';

@Entity('order_address')
export class OrderAddressEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  // @Column({ type: 'integer', name: 'address_id' })
  // public addressId: number;

  // @Column({ type: 'integer', name: 'order_id' })
  // public orderId: number;

  @ManyToOne(() => AddressEntity, (address) => address.orderAddressList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  public address: AddressEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderAddressList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  public order: OrderEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
