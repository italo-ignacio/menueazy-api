import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CouponEntity } from '../coupon';
import { SubscriptionEntity } from '../subscription';

@Entity('subscription_coupon')
export class SubscriptionCouponEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  public expiresAt: Date;

  // @Column({ type: 'integer', name: 'coupon_id' })
  // public couponId: number;

  // @Column({ type: 'integer', name: 'subscription_id' })
  // public subscriptionId: number;

  @ManyToOne(() => CouponEntity, (coupon) => coupon.subscriptionCouponList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'coupon_id', referencedColumnName: 'id' }])
  public coupon: CouponEntity;

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.subscriptionCouponList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'subscription_id', referencedColumnName: 'id' }])
  public subscription: SubscriptionEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
