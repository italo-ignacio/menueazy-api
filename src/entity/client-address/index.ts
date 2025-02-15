import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AddressEntity } from '../address';
import { ClientEntity } from '../client';

@Entity('client_address')
export class ClientAddressEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  // @Column({ type: 'integer', name: 'address_id' })
  // public addressId: number;

  // @Column({ type: 'integer', name: 'client_id' })
  // public clientId: number;

  @ManyToOne(() => AddressEntity, (address) => address.clientAddressList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  public address: AddressEntity;

  @ManyToOne(() => ClientEntity, (client) => client.clientAddressList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  public client: ClientEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
