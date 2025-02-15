import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CurrencyEntity } from '../currency';

@Entity('register_request')
export class RegisterRequestEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', length: 25 })
  public phone: string;

  @Column({ type: 'varchar', name: 'company_name', length: 255 })
  public companyName: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  public code: string;

  @Column({ type: 'boolean', name: 'can_register', default: false })
  public canRegister: boolean;

  // @Column({ type: 'integer', name: 'currency_id' })
  // public currencyId: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.registerRequestList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true
  })
  @JoinColumn([{ name: 'currency_id', referencedColumnName: 'id' }])
  public currency: CurrencyEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
