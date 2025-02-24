import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../company';
import { PlanEntity } from '../plan';
import { SubscriptionCouponEntity } from '../subscription-coupon';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ precision: 10, scale: 2, type: 'numeric' })
  public price: string;

  @Column({ type: 'integer', name: 'restaurant_limit' })
  public restaurantLimit: number;

  @Column({ type: 'integer', name: 'product_limit' })
  public productLimit: number;

  @Column({ type: 'uuid', unique: true })
  public code: string;

  // @Column({ type: 'integer', name: 'plan_id' })
  // public planId: number;

  @Column({ type: 'timestamptz', name: 'expires_at' })
  public expiresAt: Date;

  @Column({ type: 'boolean', name: 'contact_admin', default: false })
  public contactAdmin: boolean;

  @OneToOne(() => CompanyEntity, (company) => company.subscription)
  public company: CompanyEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.subscriptionList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'plan_id', referencedColumnName: 'id' }])
  public plan: PlanEntity;

  @OneToMany(
    () => SubscriptionCouponEntity,
    (subscriptionCoupon) => subscriptionCoupon.subscription
  )
  public subscriptionCouponList: SubscriptionCouponEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
