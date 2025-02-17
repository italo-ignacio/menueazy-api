import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { PlanPriceEntity } from '../plan-price';
import { RegisterRequestEntity } from '../register-request';
import { SubscriptionEntity } from '../subscription';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'integer', name: 'minimum_of_restaurant' })
  public minimumOfRestaurant: number;

  @Column({ type: 'integer', name: 'minimum_of_product' })
  public minimumOfProduct: number;

  @OneToMany(() => PlanPriceEntity, (planPrice) => planPrice.plan)
  public planPriceList: PlanPriceEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.plan)
  public subscriptionList: SubscriptionEntity[];

  @OneToMany(() => RegisterRequestEntity, (registerRequest) => registerRequest.currency)
  public registerRequestList: RegisterRequestEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
