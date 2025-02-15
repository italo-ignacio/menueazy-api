import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RestaurantEntity } from '../restaurant';

@Entity('payment_method')
export class PaymentMethodEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 100 })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'text', name: 'logo_url', nullable: true })
  public logoUrl: string | null;

  // @Column({ type: 'integer', name: 'restaurant_id' })
  // public restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.paymentMethodList, {
    onDelete: 'CASCADE',
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
