import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ClientEntity } from '../client';
import { OrderEntity } from '../order';
import { RestaurantEntity } from '../restaurant';
import { UserEntity } from '../user';

@Entity('client_report')
export class ClientReportEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  // @Column({ type: 'integer', name: 'client_id' })
  // public clientId: number;

  @ManyToOne(() => ClientEntity, (client) => client.clientReportList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity;

  // @Column({ type: 'integer', name: 'order_id', nullable: true })
  // public orderId: number | null;

  @OneToOne(() => OrderEntity, (order) => order.clientReport, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  public order: OrderEntity | null;

  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.clientReportList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  // @Column({ type: 'integer', name: 'user_id' })
  // public userId: number;

  @ManyToOne(() => UserEntity, (user) => user.clientReportList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  public user: UserEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
