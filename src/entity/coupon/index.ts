import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SubscriptionCouponEntity } from '../subscription-coupon';

@Index('coupon_code_key', ['code'], { unique: true })
@Entity('coupon')
export class CouponEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', name: 'code', length: 20 })
  public code: string;

  @Column({ type: 'float4' })
  public discount: string;

  @Column({ type: 'integer' })
  public duration: number;

  @OneToMany(() => SubscriptionCouponEntity, (subscriptionCoupon) => subscriptionCoupon.coupon)
  public subscriptionCouponList: SubscriptionCouponEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
