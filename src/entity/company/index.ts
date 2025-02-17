import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CurrencyEntity } from '../currency';
import { RestaurantEntity } from '../restaurant';
import { StyleEntity } from '../style';
import { SubscriptionEntity } from '../subscription';
import { UserEntity } from '../user';

@Index('company_company_url_domain_verified_idx', ['companyUrl', 'domainVerified'])
@Index('company_custom_domain_domain_verified_idx', ['customDomain', 'domainVerified'])
@Index('company_company_url_key', ['companyUrl'], { unique: true })
@Index('company_custom_domain_key', ['customDomain'], { unique: true })
@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'text', name: 'logo_url', nullable: true })
  public logoUrl: string | null;

  @Column({ type: 'varchar', name: 'company_url', length: 255 })
  public companyUrl: string;

  @Column({ type: 'varchar', name: 'custom_domain', nullable: true, length: 255 })
  public customDomain: string | null;

  @Column({ type: 'varchar', name: 'dns_cname', nullable: true, length: 255 })
  public dnsCname: string | null;

  @Column({ type: 'boolean', name: 'domain_verified', default: false })
  public domainVerified: boolean;

  // @Column({ type: 'integer', name: 'currency_id' })
  // public currencyId: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.companyList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'currency_id', referencedColumnName: 'id' }])
  public currency: CurrencyEntity;

  // @Column({ type: 'integer', name: 'subscription_id' })
  // public subscriptionId: number;

  @OneToOne(() => SubscriptionEntity, (subscription) => subscription.company, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'subscription_id', referencedColumnName: 'id' }])
  public subscription: SubscriptionEntity;

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.company)
  public restaurantList: RestaurantEntity[];

  @OneToMany(() => StyleEntity, (style) => style.company)
  public styleList: StyleEntity[];

  @OneToMany(() => UserEntity, (user) => user.company)
  public userList: UserEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
