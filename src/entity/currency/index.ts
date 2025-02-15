import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../company';
import { PlanPriceEntity } from '../plan-price';
import { RegisterRequestEntity } from '../register-request';

@Index('currency_code_key', ['code'], { unique: true })
@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', name: 'code', length: 3 })
  public code: string;

  @Column({ type: 'varchar', name: 'name', length: 50 })
  public name: string;

  @Column({ type: 'varchar', name: 'symbol', length: 5 })
  public symbol: string;

  @OneToMany(() => CompanyEntity, (company) => company.currency)
  public companyList: CompanyEntity[];

  @OneToMany(() => PlanPriceEntity, (planPrice) => planPrice.currency)
  public planPriceList: PlanPriceEntity[];

  @OneToMany(() => RegisterRequestEntity, (registerRequest) => registerRequest.currency)
  public registerRequestList: RegisterRequestEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
