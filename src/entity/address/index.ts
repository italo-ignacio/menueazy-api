import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ClientAddressEntity } from '../client-address';
import { OrderEntity } from '../order';
import { RestaurantEntity } from '../restaurant';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public street: string;

  @Column({ type: 'varchar', length: 255 })
  public city: string;

  @Column({ type: 'varchar', length: 255 })
  public state: string;

  @Column({ type: 'varchar', name: 'zip_code', length: 25 })
  public zipCode: string;

  @Column({ type: 'varchar', length: 255 })
  public country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public complement: string | null;

  @Column({ type: 'varchar', length: 30 })
  public number: string;

  @Column({ type: 'numeric', precision: 10, scale: 8 })
  public latitude: string;

  @Column({ type: 'numeric', precision: 11, scale: 8 })
  public longitude: string;

  @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.address)
  public clientAddressList: ClientAddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.address)
  public orderList: OrderEntity[];

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.address)
  public restaurantList: RestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
