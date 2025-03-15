import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AddressEntity } from '../address';
import { CategoryEntity } from '../category';
import { ClientReportEntity } from '../client-report';
import { CompanyEntity } from '../company';
import { DeliveryPersonEntity } from '../delivery-person';
import { OpeningHourEntity } from '../opening-hour';
import { OrderEntity } from '../order';
import { PaymentMethodEntity } from '../payment-method';
import { ProductEntity } from '../product';
import { ReviewEntity } from '../review';
import { StyleEntity } from '../style';
import { TableEntity } from '../table';
import { UserRestaurantEntity } from '../user-restaurant';

@Index('restaurant_restaurant_url_key', ['restaurantUrl'], { unique: true })
@Entity('restaurant')
export class RestaurantEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', length: 25 })
  public phone: string;

  @Column({ type: 'varchar', name: 'restaurant_url', length: 255 })
  public restaurantUrl: string;

  @Column({ type: 'text', name: 'contact_link', nullable: true })
  public contactLink: string | null;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'text', name: 'logo_url', nullable: true })
  public logoUrl: string | null;

  @Column({ type: 'boolean', default: false })
  public open: boolean;

  @Column({ type: 'boolean', name: 'open_for_delivery', nullable: true })
  public openForDelivery: boolean | null;

  @Column({ type: 'boolean', name: 'has_delivery' })
  public hasDelivery: boolean;

  @Column({ type: 'float4', name: 'minimum_order_price' })
  public minimumOrderPrice: number;

  @Column({ type: 'float4', name: 'max_delivery_distance_in_km', default: 10 })
  public maxDeliveryDistanceInKm: number;

  @Column({ type: 'float4', name: 'minimum_delivery_price', default: 5 })
  public minimumDeliveryPrice: number;

  @Column({ type: 'float4', name: 'price_by_km_in_delivery', default: 2 })
  public priceByKmInDelivery: number;

  @Column({ type: 'integer', name: 'company_id' })
  public companyId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.restaurantList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  @Column({ type: 'integer', name: 'style_id', nullable: true })
  public styleId: number | null;

  @ManyToOne(() => StyleEntity, (style) => style.restaurantList, {
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true
  })
  @JoinColumn([{ name: 'style_id', referencedColumnName: 'id' }])
  public style: StyleEntity | null;

  @Column({ type: 'integer', name: 'address_id', nullable: true })
  public addressId: number | null;

  @ManyToOne(() => AddressEntity, (address) => address.restaurantList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  public address: AddressEntity | null;

  @OneToMany(() => CategoryEntity, (category) => category.restaurant)
  public categoryList: CategoryEntity[];

  @OneToMany(() => OpeningHourEntity, (openingHour) => openingHour.restaurant)
  public openingHourList: OpeningHourEntity[];

  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.restaurant)
  public paymentMethodList: PaymentMethodEntity[];

  @OneToMany(() => TableEntity, (table) => table.restaurant)
  public tableList: TableEntity[];

  @OneToMany(() => ProductEntity, (product) => product.restaurant)
  public productList: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant)
  public orderList: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.restaurant)
  public reviewList: ReviewEntity[];

  @OneToMany(() => ClientReportEntity, (clientReport) => clientReport.restaurant)
  public clientReportList: ClientReportEntity[];

  @OneToMany(() => DeliveryPersonEntity, (deliveryPerson) => deliveryPerson.restaurant)
  public deliveryPersonList: DeliveryPersonEntity[];

  @OneToMany(() => UserRestaurantEntity, (userRestaurant) => userRestaurant.restaurant)
  public userRestaurantList: UserRestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
