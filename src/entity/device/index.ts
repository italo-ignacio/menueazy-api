import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ClientEntity } from '../client';
import { UserEntity } from '../user';

@Entity('device')
export class DeviceEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ type: 'text', name: 'token' })
  public token: string;

  @Column({ type: 'text', name: 'code' })
  public code: string;

  @Column({ name: 'last_active', type: 'timestamptz', nullable: true })
  public lastActive: Date | null;

  @Column({ type: 'integer', name: 'client_id', nullable: true })
  public clientId: number | null;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  public userId: number | null;

  @ManyToOne(() => ClientEntity, (client) => client.deviceList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.deviceList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  public user: UserEntity | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
