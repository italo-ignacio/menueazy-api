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
import { ClientReportEntity } from '../client-report';
import { CompanyEntity } from '../company';
import { OpeningHourEntity } from '../opening-hour';
import { OrderEntity } from '../order';
import { PaymentMethodEntity } from '../payment-method';
import { ProductRestaurantEntity } from '../product-restaurant';
import { RestaurantAddressEntity } from '../restaurant-address';
import { RestaurantCategoryEntity } from '../restaurant-category';
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

  @Column({ type: 'boolean', name: 'has_delivery' })
  public hasDelivery: boolean;

  @Column({
    type: 'numeric',
    name: 'max_delivery_distance_in_km',
    precision: 10,
    scale: 2,
    default: 10
  })
  public maxDeliveryDistanceInKm: number;

  @Column({
    type: 'numeric',
    name: 'minimum_delivery_value',
    precision: 10,
    scale: 2,
    default: 0
  })
  public minimumDeliveryValue: number;

  @Column({
    type: 'numeric',
    name: 'minimum_order_value',
    precision: 10,
    scale: 2,
    default: 0
  })
  public minimumOrderValue: number;

  @Column({ type: 'boolean' })
  public open: boolean;

  @Column({ type: 'boolean', name: 'open_for_delivery', nullable: true })
  public openForDelivery: boolean | null;

  @Column({
    type: 'numeric',
    name: 'value_by_km_in_delivery',
    precision: 10,
    scale: 2,
    default: 0
  })
  public valueByKmInDelivery: number;

  // @Index()
  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @ManyToOne(() => CompanyEntity, (company) => company.restaurantList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  // @Column({ type: 'integer', name: 'style_id' })
  // public styleId: number;

  @ManyToOne(() => StyleEntity, (style) => style.restaurantList, { onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'style_id', referencedColumnName: 'id' }])
  public style: StyleEntity;

  @OneToMany(() => ClientReportEntity, (clientReport) => clientReport.restaurant)
  public clientReportList: ClientReportEntity[];

  @OneToMany(() => OpeningHourEntity, (openingHour) => openingHour.restaurant)
  public openingHourList: OpeningHourEntity[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant)
  public orderList: OrderEntity[];

  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.restaurant)
  public paymentMethodList: PaymentMethodEntity[];

  @OneToMany(() => ProductRestaurantEntity, (productRestaurant) => productRestaurant.restaurant)
  public productRestaurantList: ProductRestaurantEntity[];

  @OneToMany(() => RestaurantAddressEntity, (restaurantAddress) => restaurantAddress.restaurant)
  public restaurantAddressList: RestaurantAddressEntity[];

  @OneToMany(() => RestaurantCategoryEntity, (restaurantCategory) => restaurantCategory.restaurant)
  public restaurantCategoryList: RestaurantCategoryEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.restaurant)
  public reviewList: ReviewEntity[];

  @OneToMany(() => TableEntity, (table) => table.restaurant)
  public tableList: TableEntity[];

  @OneToMany(() => UserRestaurantEntity, (userRestaurant) => userRestaurant.restaurant)
  public userRestaurantList: UserRestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
