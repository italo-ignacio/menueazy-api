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
import { CompanyEntity } from '../company';
import { OrderEntity } from '../order';

@Index('delivery_person_name_company_id_key', ['name', 'company'], { unique: true })
@Entity('delivery_person')
export class DeliveryPersonEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ length: 25, type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ type: 'integer', name: 'company_id' })
  public companyId: number;

  @OneToMany(() => OrderEntity, (order) => order.deliveryPerson)
  public orderList: OrderEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.userList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  public company: CompanyEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | null;

  @Column({ name: 'finished_at', nullable: true, type: 'timestamptz' })
  public finishedAt: Date | null;
}
