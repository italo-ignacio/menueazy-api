import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ClientAddressEntity } from '../client-address';
import { ClientReportEntity } from '../client-report';
import { DeviceEntity } from '../device';
import { OrderEntity } from '../order';
import { ReviewEntity } from '../review';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', nullable: true, length: 25 })
  public phone: string | null;

  @Column({ type: 'text', name: 'firebase_id', nullable: true })
  public firebaseId: string | null;

  @Column({ type: 'text', name: 'avatar_url', nullable: true })
  public avatarUrl: string | null;

  @Column({ type: 'boolean', name: 'is_blocked', default: false })
  public isBlocked: boolean;

  @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.client)
  public clientAddressList: ClientAddressEntity[];

  @OneToMany(() => ClientReportEntity, (clientReport) => clientReport.client)
  public clientReportList: ClientReportEntity[];

  @OneToMany(() => DeviceEntity, (device) => device.client)
  public deviceList: DeviceEntity[];

  @OneToMany(() => OrderEntity, (order) => order.client)
  public orderList: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.client)
  public reviewList: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
