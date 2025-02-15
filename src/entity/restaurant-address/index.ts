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
import { RestaurantEntity } from '../restaurant';

@Entity('restaurant_address')
export class RestaurantAddressEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  public id: number;

  @Column({ type: 'integer', name: 'address_id' })
  public addressId: number;

  @Column({ type: 'integer', name: 'restaurant_id' })
  public restaurantId: number;

  @ManyToOne(() => AddressEntity, (address) => address.restaurantAddressList, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  public address: AddressEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.restaurantAddressList, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'restaurant_id', referencedColumnName: 'id' }])
  public restaurant: RestaurantEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
