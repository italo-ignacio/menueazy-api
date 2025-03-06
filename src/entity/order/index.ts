import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrderStatus, OrderType } from '../../domain/enum';
import { AddressEntity } from '../address';
import { ClientEntity } from '../client';
import { ClientReportEntity } from '../client-report';
import { DeliveryPersonEntity } from '../delivery-person';
import { OrderProductEntity } from '../order-product';
import { RestaurantEntity } from '../restaurant';
import { ReviewEntity } from '../review';
import { TableEntity } from '../table';

@Index('order_status_type_idx', ['status', 'type'])
@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public price: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public total: string;

  @Column({ type: 'numeric', name: 'delivery_price', nullable: true, precision: 10, scale: 2 })
  public deliveryPrice: string | null;

  @Column({ type: 'text', nullable: true })
  public observation: string | null;

  @Index()
  @Column({ type: 'enum', enum: OrderStatus })
  public status: OrderStatus;

  @Index()
  @Column({ type: 'enum', enum: OrderType })
  public type: OrderType;

  @OneToOne(() => ClientReportEntity, (clientReport) => clientReport.order)
  public clientReport: ClientReportEntity | null;

  @Column({ type: 'integer', name: 'client_id', nullable: true })
  public clientId: number | null;

  @ManyToOne(() => ClientEntity, (client) => client.orderList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity | null;

  @Column({ type: 'integer', name: 'delivery_person_id', nullable: true })
  public deliveryPersonId: number | null;

  @ManyToOne(() => DeliveryPersonEntity, (deliveryPerson) => deliveryPerson.orderList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'delivery_person_id', referencedColumnName: 'id' }])
  public deliveryPerson: DeliveryPersonEntity | null;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orderList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @Column({ type: 'integer', name: 'table_id', nullable: true })
  public tableId: number | null;

  @ManyToOne(() => TableEntity, (table) => table.orderList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'table_id', referencedColumnName: 'id' }])
  public table: TableEntity | null;

  @Column({ type: 'integer', name: 'address_id' })
  public addressId: number;

  @ManyToOne(() => AddressEntity, (address) => address.orderList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  public address: AddressEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  public orderProductList: OrderProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.order)
  public reviewList: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
