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
import { Role } from '../../domain/enum';
import { ClientReportEntity } from '../client-report';
import { CompanyEntity } from '../company';
import { DeviceEntity } from '../device';
import { OrderEntity } from '../order';
import { UserRestaurantEntity } from '../user-restaurant';

@Index('user_firebase_id_key', ['firebaseId'], { unique: true })
@Index('user_email_key', ['email'], { unique: true })
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 128, type: 'varchar', name: 'firebase_id' })
  public firebaseId: string;

  @Column({ length: 255, type: 'varchar' })
  public email: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ length: 25, type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ type: 'text', nullable: true, name: 'avatar_url' })
  public avatarUrl: string | null;

  @Column({ type: 'enum', enum: Role })
  public role: Role;

  // @Column({ type: 'integer', name: 'company_id' })
  // public companyId: number;

  @OneToMany(() => ClientReportEntity, (clientReport) => clientReport.user)
  public clientReportList: ClientReportEntity[];

  @OneToMany(() => DeviceEntity, (device) => device.user)
  public deviceList: DeviceEntity[];

  @OneToMany(() => OrderEntity, (order) => order.deliveryPerson)
  public orderList: OrderEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.userList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  @OneToMany(() => UserRestaurantEntity, (userRestaurant) => userRestaurant.user)
  public userRestaurantList: UserRestaurantEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
