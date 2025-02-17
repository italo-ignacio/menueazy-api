import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { PlanPricePeriod } from '../../domain/enum';
import { CurrencyEntity } from '../currency';
import { PlanEntity } from '../plan';

@Index('plan_price_currency_plan_period_idx', ['currency', 'plan', 'period'], { unique: true })
@Entity('plan_price')
export class PlanPriceEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  // @Column({ type: 'integer', name: 'currency_id' })
  // public currencyId: number;

  // @Column({ type: 'integer', name: 'plan_id' })
  // public planId: number;

  @Column({ type: 'numeric', name: 'monthly_price', precision: 10, scale: 2 })
  public monthlyPrice: number;

  @Column({ type: 'numeric', name: 'price_of_restaurant', precision: 10, scale: 2 })
  public priceOfRestaurant: number;

  @Column({ type: 'numeric', name: 'price_of_product', precision: 10, scale: 2 })
  public priceOfProduct: number;

  @Column({ type: 'numeric', name: 'discount', precision: 10, scale: 2 })
  public discount: number;

  @Column({
    type: 'enum',
    name: 'period',
    enum: PlanPricePeriod
  })
  public period: PlanPricePeriod;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.planPriceList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'currency_id', referencedColumnName: 'id' }])
  public currency: CurrencyEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.planPriceList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'plan_id', referencedColumnName: 'id' }])
  public plan: PlanEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
